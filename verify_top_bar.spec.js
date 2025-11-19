
import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import { platform } from 'os';
import { promisify } from 'util';

const execAsync = promisify(require('child_process').exec);


test.describe('Navbar and Top Info Bar', () => {
  let serverProcess;

  test.beforeAll(async () => {
    // Start a simple web server using spawn
    serverProcess = spawn('python', ['-m', 'http.server', '8000'], {
      detached: true,
      stdio: 'ignore',
    });

    // Give the server a moment to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('Server started with PID:', serverProcess.pid);
  });

  test.afterAll(async () => {
    // Stop the web server
    if (serverProcess && serverProcess.pid) {
      console.log('Stopping server with PID:', serverProcess.pid);
      try {
        if (platform() === 'win32') {
          await execAsync(`taskkill /PID ${serverProcess.pid} /F`);
        } else {
          // The negative PID kills the process group
          process.kill(-serverProcess.pid, 'SIGKILL');
        }
        console.log('Server stopped');
      } catch (e) {
        console.error("Failed to kill server process:", e);
      }
    }
  });

  test('should display top-info-bar above the navbar on desktop', async ({ page }) => {
    await page.goto('http://localhost:8000/index.html');
    await page.setViewportSize({ width: 1280, height: 720 });

    const topInfoBar = await page.locator('.top-info-bar');
    const navbar = await page.locator('.navbar');

    const topInfoBarBoundingBox = await topInfoBar.boundingBox();
    const navbarBoundingBox = await navbar.boundingBox();

    expect(topInfoBarBoundingBox.y).toBeLessThan(navbarBoundingBox.y);
    await page.screenshot({ path: 'desktop-screenshot.png' });
  });

  test('should display top-info-bar above the navbar on mobile and dropdown should be clickable', async ({ page }) => {
    await page.goto('http://localhost:8000/index.html');
    await page.setViewportSize({ width: 375, height: 667 });

    const topInfoBar = await page.locator('.top-info-bar');
    const navbar = await page.locator('.navbar');

    const topInfoBarBoundingBox = await topInfoBar.boundingBox();
    const navbarBoundingBox = await navbar.boundingBox();

    expect(topInfoBarBoundingBox.y).toBeLessThan(navbarBoundingBox.y);

    await page.locator('.navbar-toggler').click();
    await page.locator('#skiLessonsDropdown').click();
    await expect(page.locator('ul[aria-labelledby="skiLessonsDropdown"]')).toBeVisible();

    await page.screenshot({ path: 'mobile-screenshot.png' });
  });
});

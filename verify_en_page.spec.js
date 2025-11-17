const { test, expect } = require('@playwright/test');
const { spawn } = require('child_process');

test.describe('Navbar and Top Info Bar on English Page', () => {
  let server;

  test.beforeAll(async () => {
    server = spawn('python3', ['-m', 'http.server', '8000']);
    console.log('Server started with PID:', server.pid);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for server to start
  });

  test.afterAll(async () => {
    if (server) {
      console.log('Stopping server with PID:', server.pid);
      const killed = server.kill();
      if (!killed) {
        console.error('Failed to kill server process.');
      }
    }
  });

  test('should display top-info-bar above the navbar on desktop', async ({ page }) => {
    await page.goto('http://localhost:8000/en/about-us.html');
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.waitForTimeout(500); // Wait for layout adjustments

    const topInfoBar = await page.locator('.top-info-bar');
    const navbar = await page.locator('.navbar');

    const topInfoBarBoundingBox = await topInfoBar.boundingBox();
    const navbarBoundingBox = await navbar.boundingBox();

    expect(topInfoBarBoundingBox.height).toBeGreaterThan(0);
    expect(navbarBoundingBox.y).toBeCloseTo(topInfoBarBoundingBox.height, 0);
  });

  test('should display top-info-bar above the navbar on mobile and dropdown should be clickable', async ({ page }) => {
    await page.goto('http://localhost:8000/en/about-us.html');
    await page.setViewportSize({ width: 375, height: 667 });

    await page.waitForTimeout(500); // Wait for layout adjustments

    const topInfoBar = await page.locator('.top-info-bar');
    const navbar = await page.locator('.navbar');
    const navbarToggler = await page.locator('.navbar-toggler');

    const topInfoBarBoundingBox = await topInfoBar.boundingBox();
    const navbarBoundingBox = await navbar.boundingBox();

    expect(topInfoBarBoundingBox.height).toBeGreaterThan(0);
    expect(navbarBoundingBox.y).toBeCloseTo(topInfoBarBoundingBox.height);

    await navbarToggler.click();

    const dropdownToggle = await page.locator('#skiLessonsDropdown');
    await dropdownToggle.click();

    const dropdownMenu = await page.locator('.dropdown-menu[aria-labelledby="skiLessonsDropdown"]');
    await expect(dropdownMenu).toBeVisible();
  });
});

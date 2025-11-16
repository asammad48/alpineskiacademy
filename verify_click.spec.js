const { test, expect } = require('@playwright/test');

test.describe('Navbar Dropdown Click Verification', () => {
  const resolutions = [
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Mobile', width: 375, height: 667 },
  ];

  resolutions.forEach(res => {
    test(`Click functionality on ${res.name}`, async ({ page }) => {
      await page.setViewportSize({ width: res.width, height: res.height });
      await page.goto('file://' + __dirname + '/index.html');

      const skiLessonsDropdown = page.locator('#skiLessonsDropdown');
      const dropdownMenu = page.locator('.dropdown-menu[aria-labelledby="skiLessonsDropdown"]');
      const navbarToggler = page.locator('.navbar-toggler');

      if (res.name === 'Mobile') {
        console.log('Mobile test: Clicking navbar toggler');
        await navbarToggler.click();
        console.log('Mobile test: Navbar toggler clicked');
      }

      // 1. Verify dropdown is initially hidden
      console.log(`${res.name} test: Verifying dropdown is initially hidden`);
      await expect(dropdownMenu).toBeHidden();
      console.log(`${res.name} test: Dropdown is initially hidden`);

      // 2. Verify dropdown does NOT appear on hover
      console.log(`${res.name} test: Verifying hover does not open dropdown`);
      await skiLessonsDropdown.hover();
      await page.waitForTimeout(500); // Wait to see if hover triggers it
      await expect(dropdownMenu).toBeHidden();
      console.log(`${res.name} test: Hover did not open dropdown`);

      // 3. Verify dropdown appears on click
      console.log(`${res.name} test: Clicking dropdown to open`);
      await skiLessonsDropdown.click();
      await expect(dropdownMenu).toBeVisible();
      console.log(`${res.name} test: Dropdown is visible after click`);

      // 4. Verify dropdown hides on second click
      console.log(`${res.name} test: Clicking dropdown to close`);
      await skiLessonsDropdown.click();
      await expect(dropdownMenu).toBeHidden();
      console.log(`${res.name} test: Dropdown is hidden after second click`);

      await page.screenshot({ path: `dropdown-click-test-${res.name}.png` });
    });
  });
});

import os
from playwright.sync_api import sync_playwright

def verify_dropdown_click(page, resolution_name):
    """
    Verifies that the dropdown menu opens on click and not on hover.
    """
    ski_lessons_dropdown = page.locator('#skiLessonsDropdown')
    dropdown_menu = page.locator('.dropdown-menu[aria-labelledby="skiLessonsDropdown"]')
    navbar_toggler = page.locator('.navbar-toggler')

    if resolution_name == 'Mobile':
        navbar_toggler.click()

    # Verify dropdown is initially hidden
    assert dropdown_menu.is_hidden(), "Dropdown should be hidden initially"

    # Verify dropdown does NOT appear on hover
    ski_lessons_dropdown.hover()
    page.wait_for_timeout(500)
    assert dropdown_menu.is_hidden(), "Dropdown should not appear on hover"

    # Verify dropdown appears on click
    ski_lessons_dropdown.click()
    assert dropdown_menu.is_visible(), "Dropdown should appear on click"

    # Take a screenshot of the open dropdown
    page.screenshot(path=f'dropdown-open-{resolution_name}.png')

    # Verify dropdown hides on second click
    ski_lessons_dropdown.click()
    assert dropdown_menu.is_hidden(), "Dropdown should hide on second click"

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the HTML file
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Test Desktop
        page.set_viewport_size({"width": 1280, "height": 720})
        page.goto('file://' + os.path.join(current_dir, 'index.html'))
        verify_dropdown_click(page, "Desktop")

        # Test Mobile
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto('file://' + os.path.join(current_dir, 'index.html'))
        verify_dropdown_click(page, "Mobile")

        browser.close()

if __name__ == "__main__":
    main()

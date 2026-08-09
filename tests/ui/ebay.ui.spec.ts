import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.ebay.com';
const VERIFICATION_PATH = 'verification';

test('eBay UI end-to-end flow', async ({ page }) => {
  console.log('Step: Open browser and navigate to eBay home page');
  await page.goto(BASE_URL);

  console.log('Step: Verify eBay logo, search field, and top navigation are visible');
  await expect(page.locator('#gh-logo')).toBeVisible();
  await expect(page.locator('input[aria-label*="Search"], input#gh-ac')).toBeVisible();
  await expect(page.locator('nav.gh-nav')).toBeVisible();
  await page.screenshot({ path: `${VERIFICATION_PATH}/home-page.png`, fullPage: true });

  console.log('Step: Click the Electronics category link');
  const electronicsLink = page.getByRole('link', { name: 'Electronics' }).first();
  await electronicsLink.waitFor({ state: 'attached', timeout: 15000 });
  await electronicsLink.click({ force: true });
  await expect(page).toHaveURL(/\/b\/Electronics/);
  await expect(page.locator('h1')).toContainText(/Electronics/i);
  await page.screenshot({ path: `${VERIFICATION_PATH}/category-navigation.png`, fullPage: true });

  console.log('Step: Search for laptop from the home page');
  await page.goto(BASE_URL);
  const searchInput = page.locator('input[aria-label*="Search"], input#gh-ac');
  await searchInput.fill('laptop');
  await searchInput.press('Enter');
  await expect(page).toHaveURL(/_nkw=laptop|_nkw=laptop/);
  await page.screenshot({ path: `${VERIFICATION_PATH}/search-results.png`, fullPage: true });
});

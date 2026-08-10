import { expect, type Page } from '@playwright/test';
import { test } from '../../fixtures/test-fixtures';

test('eBay UI end-to-end flow', async ({ homePage, searchPage, uiData }) => {
  await homePage.goto();
  await homePage.verifyHeader();

  await homePage.clickElectronicsCategory();
  await expect(homePage.page).toHaveURL(uiData.categoryUrlPattern, { timeout: 60000 });
  await homePage.verifyCategoryPage();

  await homePage.goto();
  await homePage.searchProduct(uiData.searchTerm);
  await searchPage.verifySearchResults(uiData.searchTerm);
});

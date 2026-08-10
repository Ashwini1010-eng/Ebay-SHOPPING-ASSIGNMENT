import { expect, type Locator, type Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly resultHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultHeading = page.locator('h1');
  }

  async verifySearchResults(searchTerm: string): Promise<void> {
    const expectedUrl = new RegExp(`_nkw=${encodeURIComponent(searchTerm)}`, 'i');
    await expect(this.page).toHaveURL(expectedUrl, { timeout: 60000 });
    await expect(this.resultHeading).toBeVisible({ timeout: 15000 });
  }
}

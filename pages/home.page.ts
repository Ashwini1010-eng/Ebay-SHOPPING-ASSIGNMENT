import { expect, type Locator, type Page } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly topNav: Locator;
  readonly electronicsLink: Locator;
  readonly verificationFolder = 'verification';

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('#gh-logo');
    this.searchInput = page.locator('input[aria-label*="Search"], input#gh-ac');
    this.topNav = page.locator('nav.gh-nav');
    this.electronicsLink = page.getByRole('link', { name: 'Electronics' }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async verifyHeader(): Promise<void> {
    await expect(this.logo).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.topNav).toBeVisible();
  }

  async clickElectronicsCategory(): Promise<void> {
    await expect(this.electronicsLink).toBeVisible({ timeout: 15000 });
    await this.electronicsLink.click({ force: true });
  }

  async searchProduct(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async verifyCategoryPage(): Promise<void> {
    await expect(this.page.locator('h1')).toContainText(/Electronics/i);
  }
}

import base, { expect, type APIRequestContext, type Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SearchPage } from '../pages/search.page';
import apiTestData from '../test-data/api-test-data';
import uiTestData from '../test-data/ui-test-data';

export type TestFixtures = {
  homePage: HomePage;
  searchPage: SearchPage;
  apiClient: APIRequestContext;
  uiData: typeof uiTestData;
  apiData: typeof apiTestData;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },

  uiData: async ({}, use) => {
    await use(uiTestData);
  },

  apiData: async ({}, use) => {
    await use(apiTestData);
  },

  apiClient: async ({ request }, use) => {
    await use(request);
  }
});

export { expect };

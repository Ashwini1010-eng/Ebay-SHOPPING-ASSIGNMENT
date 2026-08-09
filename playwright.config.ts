import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 5000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10000,
    screenshot: 'off',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
};

export default config;

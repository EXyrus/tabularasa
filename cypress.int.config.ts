
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://int.tabularasa.com', // Integration environment URL
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: true,
    video: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    // Integration testing specific configurations
    retries: {
      runMode: 1,
      openMode: 0
    },
  },
});

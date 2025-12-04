import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'src/cypress/test/**/*.cy.{js,ts,tsx}',
    supportFile: 'src/cypress/support/e2e.ts',
    fixturesFolder: 'src/cypress/fixtures',
    setupNodeEvents(on, config) {
      return config;
    }
  }
});

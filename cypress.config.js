const { defineConfig } = require('cypress');

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

module.exports = defineConfig({
  e2e: {
    baseUrl,
    specPattern: 'qa/automation/cypress/**/*.cy.js',
    supportFile: false,
  },
});
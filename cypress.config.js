const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        /**
         * Task para imprimir logs com quebra de linha no console do terminal.
         * É a única forma confiável de garantir a formatação em ambientes headless (CI/CD).
         * @param {string} message - A string formatada com caracteres de nova linha.
         */
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});
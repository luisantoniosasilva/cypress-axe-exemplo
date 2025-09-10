describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io');
  });

  // O array de impactos pode agora ser definido em um arquivo de dados ou localmente,
  // mantendo a flexibilidade da validação.
  const impactosValidados = ['critical', 'serious', 'moderate'];

  it('Verifica violações de acessibilidade de alto impacto', () => {
    // A chamada ao comando é limpa, clara e passa as opções de filtro
    // de acordo com as melhores práticas do cypress-axe.
    cy.checkA11yWithLog(
      'Teste de acessibilidade (impactos críticos e graves)',
      null,
      {
        includedImpacts: impactosValidados
      }
    );
  });
});
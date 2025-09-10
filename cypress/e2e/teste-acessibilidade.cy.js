// https://github.com/component-driven/cypress-axe

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io')
  })
  const validacaoImpacto = ['critical', 'serious', 'moderate'];
  /* Observação:
      - critical → crítico
      - serious → médio
      - moderate → menor
      - minor → baixo 
  */

  it('passes', () => {
    cy.checkA11yWithLog(
      'Teste de acessibilidade',
      null,
      {
        includedImpacts: validacaoImpacto
      }
    );
  })
})

// #REGION: ♿ Comandos: Acessibilidade (checkA11yWithLog / logA11yViolation)
// Esses comandos facilitam a verificação de acessibilidade usando cypress-axe.
// - checkA11yWithLog: injeta o axe, executa a checagem e loga cada violação.
// - logA11yViolation: formata cada violação com impacto, tradução do problema e elemento afetado.
Cypress.Commands.add('checkA11yWithLog', (
  title = 'Accessibility Check',
  context = null,
  options = null
) => {
  cy.injectAxe()
  cy.checkA11y(context, options, (violations) => {
    violations.forEach((violation) => {
      cy.logA11yViolation(violation)
    })
  })
})

// Exemplo de uso: verifica apenas a regra "iframe-orientation"
Cypress.Commands.add('logA11yViolation', (violation) => {
  const impactoMap = {
    critical: '🚨 Crítico',
    serious: '⚠️ Grave',
    moderate: '⚡ Moderado',
    minor: 'ℹ️ Leve'
  }

  const traducaoProblemas = {
    'aria-required-children': 'O elemento possui filhos que não são permitidos pela especificação ARIA',
    'aria-roles': 'O atributo "role" não é válido ou não é permitido neste elemento',
    'aria-valid-attr': 'O atributo ARIA usado não é válido',
    'aria-valid-attr-value': 'O valor do atributo ARIA não é válido',
    'button-name': 'O botão não possui nome acessível (texto, aria-label ou aria-labelledby)',
    'color-contrast': 'O contraste entre cor de fundo e texto é insuficiente',
    'document-title': 'A página não possui título definido',
    'duplicate-id': 'Existem IDs duplicados no documento',
    'form-field-multiple-labels': 'Um campo de formulário possui múltiplos rótulos associados',
    'frame-title': 'O iframe não possui título acessível',
    'heading-order': 'A hierarquia de cabeçalhos (h1, h2, h3...) está fora de ordem',
    'image-alt': 'A imagem não possui texto alternativo (atributo alt)',
    'input-button-name': 'Um botão do tipo input não possui nome acessível',
    'label': 'Um campo de formulário não possui rótulo associado',
    'landmark-one-main': 'A página deve possuir exatamente uma região principal (role="main")',
    'link-name': 'O link não possui texto acessível ou descrição clara',
    'list': 'A lista não possui itens ou contém elementos inválidos',
    'listitem': 'Um item de lista não está dentro de uma lista (ul/ol)',
    'region': 'As regiões da página (landmarks) precisam ter um nome único (aria-label ou aria-labelledby)'
  }

  const titulo = `🔎 Problema A11y: **${violation.id}**`
  const impacto = impactoMap[violation.impact] || violation.impact
  const elemento = violation.nodes?.[0]?.html || violation.target || 'Elemento não disponível'
  const problemaTraduzido =
    traducaoProblemas[violation.id] || violation.message || violation.failureSummary

  Cypress.log({
    name: 'A11y 🚨',
    message: `
  🔎 ${violation.id}
  ---
  🧩 **Elemento com problema**:
  ${elemento}
  ---
  ❌ **Problema**:
  ${problemaTraduzido}
  ---
  📊 **Impacto**:
  ${impacto}
  `,
    consoleProps: () => ({
      'Elemento HTML': elemento,
      'Problema': problemaTraduzido,
      'Impacto': impacto
    })
  })
})
// #ENDREGION
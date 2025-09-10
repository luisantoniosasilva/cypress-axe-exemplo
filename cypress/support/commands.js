// Fonte: https://github.com/component-driven/cypress-axe

// #REGION: ♿ Comandos: Acessibilidade (checkA11yWithLog / logA11yViolation)
// Esses comandos facilitam a verificação de acessibilidade usando cypress-axe.
// O novo sistema de logging utiliza cy.task() para logs formatados no terminal.

Cypress.Commands.add('checkA11yWithLog', (
    title = 'Verificação de Acessibilidade',
    context = null,
    options = {}
) => {
    cy.log(`**${title}**`);
    cy.injectAxe();

    // A abordagem original iterava manualmente. O 'violationCallback' é mais
    // idiomático e eficiente, pois é um recurso nativo do cypress-axe para
    // lidar com violações. Passamos o 'logA11yViolation' como callback.
    const violationCallback = (violations) => {
        violations.forEach(violation => {
            cy.logA11yViolation(violation);
        });
    };

    cy.checkA11y(context, options, violationCallback);
});

Cypress.Commands.add('logA11yViolation', (violation) => {
    // Carrega os dados de tradução e impacto do arquivo de fixture
    cy.fixture('a11y-data.json').then((a11yData) => {
        const impacto = a11yData.impacts[violation.impact] || violation.impact;
        const problemaTraduzido = a11yData.translations[violation.id] || violation.message || violation.failureSummary;
        const elemento = violation.nodes?.[0]?.html || violation.target || 'Elemento não disponível';

        const mensagemConsole = `
            🔎 Problema A11y: ${violation.id}
            ---
            ❌ **Problema**:
            ${problemaTraduzido}
            ---
            📊 **Impacto**:
            ${impacto}
            ---
            🧩 **Elemento com problema**:
            ${elemento}
            `;

        // A abordagem híbrida de logging é usada aqui:
        // 1. Usamos Cypress.log() para logs detalhados na GUI do Cypress Test Runner.
        // Isso é útil para depuração interativa.
        Cypress.log({
            name: 'A11y Violation',
            message: `[${violation.impact.toUpperCase()}] ${violation.id}`,
            consoleProps: () => ({
                'ID da Violação': violation.id,
                'Impacto': impacto,
                'Elemento HTML': elemento,
                'Problema': problemaTraduzido,
                'Detalhamento Completo': violation.nodes
            })
        });

        // 2. Usamos cy.task() para imprimir a string formatada no terminal.
        // Isso garante quebras de linha corretas em pipelines de CI/CD.
        cy.task('log', mensagemConsole);
    });
});
// #ENDREGION
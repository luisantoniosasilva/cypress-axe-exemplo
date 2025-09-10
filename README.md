## ♿ Cypress A11y

Este projeto demonstra como usar a biblioteca `cypress-axe` para realizar testes de acessibilidade de forma eficiente e com relatórios claros no Cypress.

---

### 🚀 Começando

Este projeto é um exemplo completo. Para executá-lo, você precisará ter o Cypress instalado.

#### **Pré-requisitos**

* Node.js
* Cypress (`npm install cypress`)

#### **Instalação**

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute os testes:
    ```bash
    npx cypress open
    ```

---

### 📝 Estrutura do Projeto

* `cypress/e2e/teste-acessibilidade.cy.js`: Contém o teste de acessibilidade principal e os **comandos customizados** para `checkA11yWithLog` e `logA11yViolation`.
* `cypress/support/e2e.js`: Arquivo de suporte onde a biblioteca `cypress-axe` é inicializada.
* `package.json`: Lista as dependências, incluindo `cypress-axe`.

---

### ✨ Comandos Customizados

Os comandos customizados foram criados para simplificar e aprimorar a experiência de teste de acessibilidade, fornecendo saídas mais legíveis e informativas diretamente no log do Cypress.

#### `cy.checkA11yWithLog(title, context, options)`

Este comando injeta a biblioteca `axe-core` na página e executa a verificação de acessibilidade. Em seguida, ele itera sobre as violações encontradas e as registra usando o comando `cy.logA11yViolation`.

* **`title`** (string): Título para o teste no log. Padrão: `'Accessibility Check'`.
* **`context`** (string | object): Seletor CSS ou array de seletores para especificar elementos a serem analisados.
* **`options`** (object): Configurações para o `axe-core`, como regras, tags e o nível de impacto a ser incluído.

#### **Exemplo de uso:**

```javascript
describe('template spec', () => {
    beforeEach(() => {
        cy.visit('[https://example.cypress.io](https://example.cypress.io)')
    })

    const validacaoImpacto = ['critical', 'serious', 'moderate'];

    it('Verifica acessibilidade da página inicial', () => {
        cy.checkA11yWithLog(
            'Teste de acessibilidade da página de exemplo',
            null,
            {
                includedImpacts: validacaoImpacto
            }
        );
    })
})
```
#### `cy.logA11yViolation(violation)`
Este comando recebe uma violação do axe-core e formata a saída do log do Cypress para torná-la mais fácil de entender. Ele inclui o tipo de problema, a tradução do problema, o impacto (com ícones) e o elemento afetado.

### 🎨 Visualizando os Resultados
Ao executar os testes, os resultados de acessibilidade serão exibidos diretamente no log do Cypress, facilitando a identificação de problemas.
A formatação customizada destaca informações essenciais como o problema, o impacto e o elemento HTML afetado.

<br>

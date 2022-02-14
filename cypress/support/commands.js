Cypress.Commands.add("login", (usuario, senha) => {
  cy.get("#username").type(usuario)
  cy.get("#password").type(senha)
  cy.get(".woocommerce-form > .button").click()

  cy.get(".page-title").should("contain", "Minha conta")
  cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
    "contain",
    "Olá, aluno_ebac"
  )
})

Cypress.Commands.add("preCadastro", (email, senha, nome, sobrenome) => {
  cy.get("#reg_email").type(email)
  cy.get("#reg_password").type(senha)
  cy.get(":nth-child(4) > .button").click()

  cy.get(".woocommerce-MyAccount-navigation-link--edit-account > a").click()
  cy.get("#account_first_name").type(nome)
  cy.get("#account_last_name").type(sobrenome)
  cy.get(".woocommerce-Button").click()
  cy.get(".woocommerce-message").should(
    "contain",
    "Detalhes da conta modificados com sucesso."
  )
})

Cypress.Commands.add("addProdutos", (produto, tamanho, cor, quantidade) => {
  cy.get('[class="product-block grid"]')
    .contains(produto)
    .click()
  cy.get(`.button-variable-item-${tamanho}`).click()
  cy.get(`.button-variable-item-${cor}`).click()
  cy.get(".input-text").clear().type(quantidade)
  cy.get(".single_add_to_cart_button").click()

  cy.get(".dropdown-toggle > .mini-cart-items").should("contain", quantidade)
  cy.get(".woocommerce-message")
    .should("contain", `${quantidade}`)
    .and("contain", produto)
})

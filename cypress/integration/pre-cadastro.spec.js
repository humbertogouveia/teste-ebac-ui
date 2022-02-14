/// <reference types="cypress" />

const { faker } = require("@faker-js/faker")
let firstNameFaker = faker.name.firstName()
let lastNameFaker = faker.name.lastName()
let emailFaker = faker.internet.email()
let passwordFaker = faker.internet.password()

describe("Funcionalidade Pré Cadastro", () => {

    beforeEach(()=>{
        cy.visit("minha-conta/")

    })
  it("Deve completar o pré cadastro com sucesso", () => {
    cy.get("#reg_email").type(emailFaker)
    cy.get("#reg_password").type(passwordFaker)
    cy.get(":nth-child(4) > .button").click()

    cy.get(".woocommerce-MyAccount-navigation-link--edit-account > a").click()
    cy.get("#account_first_name").type(firstNameFaker)
    cy.get("#account_last_name").type(lastNameFaker)
    cy.get(".woocommerce-Button").click()
    cy.get(".woocommerce-message").should(
      "contain",
      "Detalhes da conta modificados com sucesso."
    )
  })

  it.only("Deve completar o pré-cadastro com sucesso - Utilizando comandos customizados", () => {
    cy.preCadastro(emailFaker, passwordFaker, firstNameFaker, lastNameFaker)
  })
})

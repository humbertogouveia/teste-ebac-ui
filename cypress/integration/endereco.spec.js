const perfil = require("../fixtures/perfil.json")

describe("Funcionalidade de endereços - faturamento e entrega", () => {
  beforeEach(() => {
    cy.visit("/minha-conta")
    cy.login(perfil.usuario, perfil.senha)
  })

  it("Deve fazer cadastro de faturamento com sucesso", () => {})
})

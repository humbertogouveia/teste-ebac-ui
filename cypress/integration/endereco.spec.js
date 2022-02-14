import enderecoPage from '../support/page-objects/endereco.page'

const perfil = require("../fixtures/perfil.json")

describe("Funcionalidade de endereços - faturamento e entrega", () => {
  beforeEach(() => {
    cy.visit("/minha-conta")
    cy.login(perfil.usuario, perfil.senha)
  })

  it.only("Deve editar de faturamento com sucesso", () => {
    enderecoPage.editarEnderecoFaturamento('Humberto','Gouveia','Apple Inc','Brasil','Rua Green','10','São Paulo','São Paulo','08225000')
    cy.get('.woocommerce-message').should('contain','Endereço alterado com sucesso.')
    
  })
})

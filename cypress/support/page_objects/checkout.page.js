const { faker } = require('@faker-js/faker');
const Leite = require('leite')
const leite = new Leite()

class Checkout {

    preencherCamposDePreCadastro(nome, sobrenome, nomeDaEmpresa, pais, endereco, numero, cidade, estado, cep, telefone, email) {
      

        nome = leite.pessoa.usuario()
        sobrenome = leite.pessoa.sobrenome()
        nomeDaEmpresa = 'Empresa de Teste'
        pais = 'Brasil'
        endereco = leite.localizacao.logradouro()
        numero = faker.datatype.number()
        cidade = leite.localizacao.cidade()
        estado = 'São Paulo'
        cep = leite.localizacao.cep({ formatado: true })
        telefone = faker.datatype.number(100000000000)
        email = leite.pessoa.email()

        cy.get('#billing_first_name').clear().type(nome)
        cy.get('#billing_last_name').clear().type(sobrenome)
        cy.get('#billing_company').clear().type(nomeDaEmpresa)
        cy.get('#select2-billing_country-container').click().type(`${pais}{enter}`)
        cy.get('#billing_address_1')
        .clear()
        .should('be.empty')
        .type(endereco)
        cy.get('#billing_address_2').clear().type(numero)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('#select2-billing_state-container').click().type(`${estado}{enter}`)
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(telefone)
        cy.get('#billing_email').clear().type(email)
        cy.get('#terms').check()

    }

    finalizarCompra() {
        cy.get('#place_order').click()
        cy.get('.page-title').should('have.text', 'Pedido recebido')
        cy.get('.woocommerce-notice').should('have.text', 'Obrigado. Seu pedido foi recebido.')

    }

}

export default new Checkout()
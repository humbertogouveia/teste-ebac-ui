/// <reference types="cypress" />

describe('Funcionalidade Página de produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')

    })
    it('Deve selecionar o primeiro produto da lista', () => {
        cy.get('[class="product-block grid"]').first().click()

    })

    it('Deve selecionar o último produto da lista', () => {
        cy.get('[class="product-block grid"]').last().click()

    })

    it('Deve selecionar o terceiro produto da lista', () => {
        cy.get('[class="product-block grid"]').eq('3').click()

    })

    it('Deve clicar em um item dentro da lista chamado Ariel Roll Sleeve Sweatshirt', () => {
        cy.get('[class="product-block grid"]')
            .contains('Ariel Roll Sleeve Sweatshirt')
            .click()
    })

    it('Deve adicionar um produto ao carrinho', () => {
        let quantidade = 2

        cy.get('[class="product-block grid"]')
            .contains('Argus All-Weather Tank')
            .click()
        cy.get('.button-variable-item-S').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message')
             .should('contain', `${quantidade}`)
              .and('contain','Argus All-Weather Tank')
    })

    it('Deve adicionar um produto ao carrinho utilizando comando customizado',()=>{
        cy.addProdutos('Argus All-Weather Tank','S',3)
    })
    it.only('Deve adicionar um produto ao carrinho utilizando comando customizado',()=>{
        cy.addProdutos('Aero Daily Fitness Tee','S','Black',2)
    })
})
class CompraProduto  {

    adicionarProdutoParaCarrinhoDeCompras(produto,tamanho,cor,quantidade){

    cy.get('#primary-menu > .menu-item-629 > a').click()
    cy.get('.products > .row')
    .contains(produto)
    .click()

    cy.get('.product_title').should('have.text',produto)
    cy.get(`.button-variable-item-${tamanho}`).click()
    cy.get(`.button-variable-item-${cor}`).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button')
    .should('have.class','single_add_to_cart_button button alt')
    .click()
    cy.get('[class=woocommerce-message]').should('contain',`${quantidade} × “${produto}” foram adicionados no seu carrinho.`)
    cy.get('.woocommerce-message > .button').click()
    }

}

export default new CompraProduto()
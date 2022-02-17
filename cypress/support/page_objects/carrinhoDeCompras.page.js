class CarrinhoDeCompras  {

    concluirCompra() {
        cy.get('.checkout-button').click()
    }


}

export default new CarrinhoDeCompras()
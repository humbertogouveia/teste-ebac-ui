/// <reference types="cypress" />
import dados from '../fixtures/perfil.json'
import cliente from '../fixtures/cliente.json'
import carrinhoDeComprasPage from '../support/page_objects/carrinhoDeCompras.page'
import checkoutPage from '../support/page_objects/checkout.page'
import compraProdutoPage from '../support/page_objects/compraProduto.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/my-account/')
        cy.title().should('eq', 'Minha conta – EBAC – Shop')
    })

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.login(dados.usuario, dados.senha)
        compraProdutoPage.adicionarProdutoParaCarrinhoDeCompras('Abominable Hoodie','S','Green',4)
        carrinhoDeComprasPage.concluirCompra()
        checkoutPage.preencherCamposDePreCadastro(cliente.nome,cliente.sobrenome,cliente.nomeDaEmpresa,cliente.pais,cliente.endereco,cliente.numero,cliente.cidade,cliente.estado,cliente.cep,cliente.telefone,cliente.email)
        checkoutPage.finalizarCompra()
        cy.get('.woocommerce-notice').should('have.text', 'Obrigado. Seu pedido foi recebido.')

    })
})




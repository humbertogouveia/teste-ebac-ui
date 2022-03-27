class EnderecoPage {

    editarEnderecoFaturamento(nome,sobrenome,nomeEmpresa,pais,logradouro,numeroLogradouro,cidade,estado,cep) {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.get(':nth-child(2) > .title > .edit').click()
        cy.get('#shipping_first_name').clear().type(nome)
        cy.get('#shipping_last_name').clear().type(sobrenome)
        cy.get('#shipping_company').clear().type(nomeEmpresa)

        cy.get('#select2-shipping_country-container')
            .click()
            .type(`${pais}{enter}`)
        cy.get('#shipping_address_1').clear().type(logradouro)
        cy.get('#shipping_address_2').clear().type(numeroLogradouro)
        cy.get('#shipping_city').clear().type(cidade)
        cy.get('#select2-shipping_state-container')
            .click()
            .type(`${estado}{enter}`)
        cy.get('#shipping_postcode').clear().type(cep)
        cy.get('[name=save_address]').click()

    }


}

export default new EnderecoPage()

/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.token("fulano@qa.com", "teste").then((tkn) => {
               token = tkn
          })
     })

     it('Deve validar contrato de usuários', () => {
          cy.request('/usuarios').then((response) => {
               return contrato.validateAsync(response.body)
          })
     })

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: '/usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('quantidade')
               expect(response.body).to.have.property('usuarios')
          })
     })

     it('Deve cadastrar um usuário com sucesso', () => {
          let novoUsuario = `UsuarioTeste${Math.floor(Math.random() * 100)}`
          cy.cadastroDeUsuario(novoUsuario, `${novoUsuario}@teste.com.br`, 'teste', 'true')
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body).to.have.property('message')
                    expect(response.body).to.have.property('_id')
               })
     })

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastroDeUsuario('humberto gouveia', 'humbertoteste.com.br', 'teste', 'true')
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.email).to.equal('email deve ser um email válido')
               })
     })


     it('Deve editar um usuário previamente cadastrado', () => {
          let novoUsuario = `UsuarioTeste${Math.floor(Math.random() * 100)}`
          let usuarioEditado = `UsuarioEditado${Math.floor(Math.random() * 100)}`

          cy.cadastroDeUsuario(novoUsuario, `${novoUsuario}@teste.com.br`, 'teste', 'true')
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `/usuarios/${id}`,
                         headers: { authorization: token },
                         body: {
                              "nome": `${usuarioEditado}`,
                              "email": `${usuarioEditado}@qa.com.br`,
                              "password": "teste",
                              "administrador": "true"
                         }

                    }).then(response => {
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     })


     it('Deve deletar um usuário previamente cadastrado', () => {
          let novoUsuario = `UsuarioTeste${Math.floor(Math.random() * 100)}`
          cy.cadastroDeUsuario(novoUsuario, `${novoUsuario}@teste.com.br`, 'teste', 'true')
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `/usuarios/${id}`,
                         headers: { authorization: token },
                    })

               }).then((response) => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
               })
     })
})

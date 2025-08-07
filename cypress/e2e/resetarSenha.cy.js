describe('Resetar senha', () => {
    const novaSenha = 'Senha@123'

    beforeEach(() => {
      cy.visit('/')
    })

it('Deve resetar a senha ao informar usuário e token válidos', () => {
    
    
    cy.ResetarSenha('grupo4', 'Token gerado com sucesso!')

    cy.get('#generated-token')
      .invoke('val')
      .then((tokenGerado) => {

        cy.get('#go-to-reset').click({ force: true })


        cy.get('#reset-username').click({ force: true }).type('grupo4')
        cy.get('#reset-token').click({ force: true }).type(tokenGerado)
        cy.get('#new-password').click({ force: true }).type(novaSenha)
        cy.get('#confirm-password').click({ force: true }).type(novaSenha)
        cy.contains('button', 'Redefinir Senha').click()

        cy.get('.message').contains('Senha redefinida com sucesso!').should('be.visible')

        cy.updatePasswordInFixture(novaSenha)
      })

  })


  it('Não deve resetar a senha ao informar usuário inválido', () => {

    cy.ResetarSenha('grupo4', 'Token gerado com sucesso!')

    cy.get('#generated-token')
      .invoke('val')
      .then((tokenGerado) => {

        cy.get('#go-to-reset').click({ force: true })

        cy.get('#reset-username').click({ force: true }).type('grupo')
        cy.get('#reset-token').click({ force: true }).type(tokenGerado)
        cy.get('#new-password').click({ force: true }).type(novaSenha)
        cy.get('#confirm-password').click({ force: true }).type(novaSenha)
        cy.contains('button', 'Redefinir Senha').click()

        cy.get('.message').contains('Usuário não encontrado').should('be.visible')

      })
  })


  it('Não deve resetar a senha ao informar token inválido', () => {
    cy.ResetarSenha('grupo4', 'Token gerado com sucesso!')

    cy.get('#go-to-reset').click({ force: true })

    cy.get('#reset-username').click({ force: true }).type('grupo4')
    cy.get('#reset-token').click({ force: true }).type('12345')
    cy.get('#new-password').click({ force: true }).type(novaSenha)
    cy.get('#confirm-password').click({ force: true }).type(novaSenha)
    cy.contains('button', 'Redefinir Senha').click()

    cy.get('.message').contains('Token inválido').should('be.visible')



  })

})


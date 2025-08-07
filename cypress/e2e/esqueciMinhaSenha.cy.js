describe('Esqueci minha senha', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Deve retornar Token gerado com sucesso quando o usuário informado for válido', () => {

      cy.ResetarSenha()
    })


    it('Deve resetar a senha ao informar usuário e token válidos', () => {
      cy.ResetarSenha()

      cy.get('#generated-token')
  .invoke('val')
  .then((tokenGerado) => {
  
    cy.get('#go-to-reset').click({ force: true })
    
    
    cy.get('#reset-username').click({ force: true }).type('grupo4')
    cy.get('#reset-token').click({ force: true }).type(tokenGerado)
    cy.get('#new-password').click({ force: true }).type('123456')
    cy.get('#confirm-password').click({ force: true }).type('123456')
    cy.contains('button', 'Redefinir Senha').click()

    cy.get('.message').contains('Senha redefinida com sucesso!').should('be.visible')
  })

    })

    
})
  
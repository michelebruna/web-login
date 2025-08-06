describe('Esqueci minha senha', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Deve retornar sucesso com 201 quando o usuário informado for válido', () => {
        cy.get('#forgot-password-link').click()
        cy.get('#forgot-username').click({ force: true }).type('grupo4')
        cy.contains('button', 'Gerar Token').click()
        
        cy.contains('div', 'Token gerado com sucesso!').should('be.visible')
        
    })
    
})
  
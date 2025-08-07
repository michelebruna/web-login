describe('Esqueci minha senha', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Deve retornar Token gerado com sucesso quando o usuário informado for válido', () => {
        let token

      cy.get('#forgot-password-link').click()
      cy.get('#forgot-username').click({ force: true }).type('grupo4')
      cy.contains('button', 'Gerar Token').click()

      cy.contains('div', 'Token gerado com sucesso!').should('be.visible')

        l
     //cy.get('#copy-token').click()
    })

    //it('')
    
})

describe('Resetar senha', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve salvar a nova senha quando informar um token válido', () => {
    cy.get('#go-to-reset').click()
    cy.get('#reset-username').click().type('grupo4')
    cy.get('#reset-token').click().type(token)
    cy.get('#new-password').click().type('123456')
    cy.get('#confirm-password').click().type('123456')
  
  
  

        

})
})
  
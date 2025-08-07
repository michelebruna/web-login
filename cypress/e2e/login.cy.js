describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Login com dados válidos deve permitir a entrada no sistema', () => {
    cy.get('#username').click({ force: true }).type('grupo4')
    cy.get('#password').click({ force: true }).type('Senha@123')
    cy.contains('button', 'Entrar').click()

    cy.contains('div', 'Login realizado com sucesso!').should('be.visible')
  })

  it('Login com usuário inválido não deve permitir a entrada no sistema', () => {
    cy.get('#username').click({ force: true }).type('grupo')
    cy.get('#password').click({ force: true }).type('Senha@123')
    cy.contains('button', 'Entrar').click()

    cy.get('.message').contains('Credenciais inválidas. Tentativas restantes:').should('be.visible')
    
  })

  it('Login com senha inválida não deve permitir a entrada no sistema', () => {
    cy.get('#username').click({ force: true }).type('grupo4')
    cy.get('#password').click({ force: true }).type('senha')
    cy.contains('button', 'Entrar').click()

    cy.get('.message').contains('Credenciais inválidas. Tentativas restantes:').should('be.visible')
    
  })

  it.only('Usuário deve ser bloqueado após 2 tentativas inválidas', () => {
    for (let i = 0; i < 2; i++) {
      cy.get('#username').click({ force: true }).clear().type('grupo4')
      cy.get('#password').click({ force: true }).clear().type('senha')
      cy.contains('button', 'Entrar').click()

      cy.get('.message').contains('Credenciais inválidas. Tentativas restantes:').should('be.visible')

    }
    cy.get('#username').click({ force: true }).clear().type('grupo4')
    cy.get('#password').click({ force: true }).clear().type('senha')
    cy.contains('button', 'Entrar').click()

    cy.get('.message').contains('Usuário bloqueado após 3 tentativas. Use "Esqueci minha senha" para desbloquear.').should('be.visible')


})
})
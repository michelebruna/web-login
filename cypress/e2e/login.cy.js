describe('template spec', () => {
  it('Login com dados válidos deve permitir a entrada no sistema', async () => {
    cy.visit('http://localhost:8080')
    cy.get('#username').click({ force: true }).type('grupo4')
    cy.get('#password').click({ force: true }).type('senha@1234')
    cy.get('#login-form > :nth-child(3) > .col > .btn').click()

    cy.contains('div', 'Login realizado com sucesso!').should('be.visible')
  })
})


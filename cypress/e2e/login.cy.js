describe('template spec', () => {
  it('Login com dados válidos deve permitir a entrada no sistema', () => {
    //Arrange
    cy.visit('http://localhost:8080')

    //Act
    cy.get('#username').click({ force: true }).type('grupo4')
    cy.get('#password').click({ force: true }).type('senha@1234')
    cy.contains('button', 'Entrar').click()

    //Assert
    cy.contains('div', 'Login realizado com sucesso!').should('be.visible')
  })

  it('Login com usuário inválido não deve permitir a entrada no sistema', () => {
    //Arrange
    cy.visit('http://localhost:8080')

    //Act
    cy.get('#username').click({ force: true }).type('grupo')
    cy.get('#password').click({ force: true }).type('senha@1234')
    cy.contains('button', 'Entrar').click()

    //Assert
    cy.get('.message').contains('Credenciais inválidas. Tentativas restantes:').should('be.visible')
    
  })
})


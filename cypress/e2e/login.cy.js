describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Login com dados válidos deve permitir a entrada no sistema', () => {
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click({ force: true }).type(credenciais.valida.username)
      cy.get('#password').click({ force: true }).type(credenciais.valida.password)
    })

    cy.contains('button', 'Entrar').click()

    cy.contains('div', 'Login realizado com sucesso!').should('be.visible')

  })

  it('Login com usuário inválido não deve permitir a entrada no sistema', () => {
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click({ force: true }).type(credenciais.usuarioInvalido.username)
      cy.get('#password').click({ force: true }).type(credenciais.usuarioInvalido.password)
    })

    cy.contains('button', 'Entrar').click()

    cy.get('.message').contains('Credenciais inválidas. Tentativas restantes:').should('be.visible')


  })

  it('Login com senha inválida não deve permitir a entrada no sistema', () => {
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click({ force: true }).type(credenciais.senhaInvalida.username)
      cy.get('#password').click({ force: true }).type(credenciais.senhaInvalida.password)
    })

    cy.contains('button', 'Entrar').click()

    cy.get('.message').contains('Credenciais inválidas. Tentativas restantes:').should('be.visible')


  })

  it('Usuário deve ser bloqueado após 3 tentativas inválidas', () => {
    for (let i = 0; i < 2; i++) {
      cy.fixture('credenciais').then(credenciais => {
        cy.get('#username').click({ force: true }).type(credenciais.senhaInvalida.username)
        cy.get('#password').click({ force: true }).type(credenciais.senhaInvalida.password)
      })
      cy.contains('button', 'Entrar').click()

      cy.get('.message').contains('Credenciais inválidas. Tentativas restantes:').should('be.visible')

    }
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click({ force: true }).clear().type(credenciais.senhaInvalida.username)
      cy.get('#password').click({ force: true }).clear().type(credenciais.senhaInvalida.password)
    })

    cy.contains('button', 'Entrar').click()

    cy.get('.message').contains('Usuário bloqueado após 3 tentativas. Use "Esqueci minha senha" para desbloquear.').should('be.visible')

  })

})

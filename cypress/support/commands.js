// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('ResetarSenha', () => {
    cy.get('#forgot-password-link').click({ force: true })
    cy.get('#forgot-username').click({ force: true }).type('grupo4')
    cy.contains('button', 'Gerar Token').click()

    cy.contains('div', 'Token gerado com sucesso!').should('be.visible')

      
   //cy.get('#copy-token').click({ force: true })
   //cy.pegarValorInput().as('token')
   //cy.get('@token').then((token) => {
    //cy.log('Valor do token: ' + token)
  //})
   
})

//Cypress.Commands.add('pegarValorInput', () => {
  //  return cy.get('#generated-token').invoke('val')
  //})
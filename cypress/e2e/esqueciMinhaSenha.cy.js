describe('Esqueci minha senha', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve retornar Token gerado com sucesso quando o usuário informado for válido', () => {

    cy.ResetarSenha('grupo4', 'Token gerado com sucesso!')
  })

  it('Não deve retornar o token quando o usuário informado for inválido', () => {

    cy.ResetarSenha('grupo', 'Usuário não encontrado')

  })
  


})
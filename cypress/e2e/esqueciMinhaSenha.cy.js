describe('Esqueci minha senha', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Deve retornar Token gerado com sucesso quando o usuário informado for válido', () => {

      cy.ResetarSenha()
    })

    
})
  
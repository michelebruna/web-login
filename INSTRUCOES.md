# Instruções de Uso - Aplicação Web de Login

## 🚀 Como Executar

### 1. Iniciar a API de Login
```bash
cd ../api-login
npm install
npm start
```
A API estará disponível em: `http://localhost:3000`

### 2. Iniciar a Aplicação Web
```bash
cd ../web-login
npm install
npm start
```
A aplicação web estará disponível em: `http://localhost:8080`

## 📋 Funcionalidades Disponíveis

### 1. **Login de Usuário**
- **Usuário de teste**: `grupo4`
- **Senha de teste**: `senha@1234`
- Acesse a página inicial
- Digite as credenciais
- Clique em "Entrar"

### 2. **Bloqueio de Senha**
- Após 3 tentativas incorretas de login
- O usuário será bloqueado automaticamente
- Uma mensagem de erro será exibida
- Use "Esqueci minha senha" para desbloquear

### 3. **Esqueci Minha Senha**
- Clique no link "Esqueci minha senha"
- Digite o username (`grupo4`)
- Clique em "Gerar Token"
- Um token será gerado e exibido na tela

### 4. **Reset de Senha**
- Use o token gerado
- Digite a nova senha (mínimo 6 caracteres)
- Confirme a nova senha
- Clique em "Redefinir Senha"
- A senha será redefinida e o usuário desbloqueado

## 🧪 Cenários de Teste

### Cenário 1: Login Bem-sucedido
1. Acesse `http://localhost:8080`
2. Digite username: `grupo4`
3. Digite senha: `senha@1234`
4. Clique em "Entrar"
5. **Resultado esperado**: Mensagem de sucesso

### Cenário 2: Login com Senha Incorreta
1. Digite username: `grupo4`
2. Digite senha incorreta
3. Clique em "Entrar"
4. **Resultado esperado**: Mensagem de erro com tentativas restantes

### Cenário 3: Bloqueio de Usuário
1. Faça 3 tentativas de login com senha incorreta
2. **Resultado esperado**: Usuário bloqueado com mensagem de erro

### Cenário 4: Desbloqueio via "Esqueci Minha Senha"
1. Com usuário bloqueado, clique em "Esqueci minha senha"
2. Digite username: `grupo4`
3. Clique em "Gerar Token"
4. **Resultado esperado**: Token gerado e usuário desbloqueado

### Cenário 5: Reset de Senha
1. Use o token gerado
2. Digite nova senha: `novaSenha123`
3. Confirme a nova senha
4. Clique em "Redefinir Senha"
5. **Resultado esperado**: Senha redefinida com sucesso

### Cenário 6: Login com Nova Senha
1. Use username: `grupo4`
2. Use nova senha: `novaSenha123`
3. Clique em "Entrar"
4. **Resultado esperado**: Login bem-sucedido

## 🔧 Recursos da Interface

### Status da API
- Indicador visual do status da API
- Verde: API online
- Vermelho: API offline

### Navegação
- **Login**: Formulário principal de autenticação
- **Esqueci Minha Senha**: Geração de token
- **Token Gerado**: Exibição do token com opção de cópia
- **Reset de Senha**: Redefinição de senha

### Validações
- Campos obrigatórios
- Confirmação de senha
- Senha mínima de 6 caracteres
- Token válido

### Mensagens
- **Sucesso**: Verde com ícone de check
- **Erro**: Vermelho com ícone de erro
- **Aviso**: Amarelo com ícone de info

## 🎨 Interface Responsiva

A aplicação é totalmente responsiva e funciona em:
- Desktop
- Tablet
- Smartphone

## 🔒 Segurança

- Comunicação via HTTPS (em produção)
- Validação de entrada
- Sanitização de dados
- Tokens temporários para reset

## 📱 Compatibilidade

- Chrome, Firefox, Safari, Edge
- MaterializeCSS para design responsivo
- JavaScript ES6+
- Axios para requisições HTTP

## 🐛 Solução de Problemas

### API não está disponível
1. Verifique se a API está rodando em `http://localhost:3000`
2. Execute `npm start` na pasta `api-login`
3. Verifique se não há erros no console

### Aplicação web não carrega
1. Verifique se o servidor está rodando em `http://localhost:8080`
2. Execute `npm start` na pasta `web-login`
3. Verifique se não há erros no console

### Token não é gerado
1. Verifique se o username está correto (`grupo4`)
2. Verifique se a API está funcionando
3. Verifique o console do navegador para erros

### Reset de senha não funciona
1. Verifique se o token está correto
2. Verifique se as senhas coincidem
3. Verifique se a senha tem pelo menos 6 caracteres 
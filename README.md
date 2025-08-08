# Aplicação Web de Gestão de Login

Esta é uma aplicação web para gestão de login desenvolvida para estudos de teste de software. A aplicação consome a API de login disponível em `../api-login`.

## Componentes do grupo

- Amanda Ruiz
- Dionara Paiva
- Michele Silva

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Framework CSS**: MaterializeCSS
- **Backend**: Express.js
- **Comunicação**: JSON via HTTP

## Funcionalidades

- ✅ **Login de Usuário**: Autenticação com username e password
- ✅ **Bloqueio de Senha**: Após 3 tentativas incorretas, o usuário é bloqueado
- ✅ **Esqueci Minha Senha**: Geração de token para reset de senha
- ✅ **Reset de Senha**: Redefinição de senha usando token

## Estrutura do Projeto

```
web-login/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm
- API de login rodando em `http://localhost:3000`

### Passos para Execução

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar a API de login:**
   ```bash
   cd ../api-login
   npm install
   npm start
   ```

3. **Iniciar a aplicação web:**
   ```bash
   cd ../web-login
   npm start
   ```

4. **Acessar a aplicação:**
   ```
   http://localhost:8080
   ```

## Usuário de Teste

Para facilitar os testes, utilize o usuário padrão:
- **Username**: `grupo4`
- **Password**: `Senha@123`

## Fluxo de Funcionalidades

### 1. Login
- Acesse a página inicial
- Digite username e password
- Clique em "Entrar"
- Se as credenciais estiverem corretas, será exibida uma mensagem de sucesso

### 2. Bloqueio de Senha
- Após 3 tentativas incorretas de login
- O usuário será bloqueado automaticamente
- Uma mensagem de erro será exibida

### 3. Esqueci Minha Senha
- Clique no link "Esqueci minha senha"
- Digite o username
- Um token será gerado e exibido na tela

### 4. Reset de Senha
- Use o token gerado
- Digite a nova senha
- Confirme a nova senha
- A senha será redefinida e o usuário desbloqueado

## Endpoints da API Consumidos

- `POST /login` - Autenticação do usuário
- `POST /forgot-password` - Geração de token para reset
- `POST /reset-password` - Redefinição de senha

## Desenvolvimento

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## Observações

- Esta aplicação é apenas para fins de estudo
- Não utiliza banco de dados - dados em memória
- Comunicação via JSON com a API
- Interface responsiva com MaterializeCSS 
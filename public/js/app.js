// Configuração da API
const API_BASE_URL = ''; // Usar rotas relativas para o proxy

// Estado da aplicação
let currentToken = '';
let loginAttempts = {};

// Elementos do DOM
const elements = {
    // Seções
    loginSection: document.getElementById('login-section'),
    forgotSection: document.getElementById('forgot-section'),
    resetSection: document.getElementById('reset-section'),
    tokenSection: document.getElementById('token-section'),
    
    // Status da API
    apiStatus: document.getElementById('api-status'),
    statusText: document.getElementById('status-text'),
    
    // Formulários
    loginForm: document.getElementById('login-form'),
    forgotForm: document.getElementById('forgot-form'),
    resetForm: document.getElementById('reset-form'),
    
    // Inputs do login
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    
    // Inputs do forgot password
    forgotUsername: document.getElementById('forgot-username'),
    
    // Inputs do reset password
    resetUsername: document.getElementById('reset-username'),
    resetToken: document.getElementById('reset-token'),
    newPassword: document.getElementById('new-password'),
    confirmPassword: document.getElementById('confirm-password'),
    
    // Token gerado
    generatedToken: document.getElementById('generated-token'),
    
    // Links
    forgotPasswordLink: document.getElementById('forgot-password-link'),
    backToLogin: document.getElementById('back-to-login'),
    backToLoginReset: document.getElementById('back-to-login-reset'),
    goToReset: document.getElementById('go-to-reset'),
    copyToken: document.getElementById('copy-token')
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Função de inicialização
function initializeApp() {
    // Inicializar MaterializeCSS
    M.AutoInit();
    
    // Verificar status da API
    checkApiStatus();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Configurar labels do MaterializeCSS
    setupMaterializeLabels();
}

// Configurar event listeners
function setupEventListeners() {
    // Login form
    elements.loginForm.addEventListener('submit', handleLogin);
    
    // Forgot password form
    elements.forgotForm.addEventListener('submit', handleForgotPassword);
    
    // Reset password form
    elements.resetForm.addEventListener('submit', handleResetPassword);
    
    // Links de navegação
    elements.forgotPasswordLink.addEventListener('click', showForgotSection);
    elements.backToLogin.addEventListener('click', showLoginSection);
    elements.backToLoginReset.addEventListener('click', showLoginSection);
    elements.goToReset.addEventListener('click', showResetSection);
    elements.copyToken.addEventListener('click', copyTokenToClipboard);
}

// Configurar labels do MaterializeCSS
function setupMaterializeLabels() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value) {
            input.classList.add('active');
        }
    });
}

// Verificar status da API
async function checkApiStatus() {
    try {
        const response = await axios.get('/api-status');
        if (response.data.status === 'online') {
            updateApiStatus('online', 'API está funcionando corretamente');
        } else {
            updateApiStatus('offline', 'API não está disponível');
        }
    } catch (error) {
        updateApiStatus('offline', 'API não está disponível. Certifique-se de que a API está rodando em http://localhost:3000');
    }
}

// Atualizar status da API
function updateApiStatus(status, message) {
    elements.apiStatus.className = `card-panel ${status === 'online' ? 'blue lighten-5 online' : 'red lighten-5 offline'}`;
    elements.statusText.textContent = message;
}

// Mostrar seção de login
function showLoginSection() {
    hideAllSections();
    elements.loginSection.style.display = 'block';
    clearForms();
}

// Mostrar seção de esqueci minha senha
function showForgotSection() {
    hideAllSections();
    elements.forgotSection.style.display = 'block';
    clearForms();
}

// Mostrar seção de reset de senha
function showResetSection() {
    hideAllSections();
    elements.resetSection.style.display = 'block';
    clearForms();
}

// Mostrar seção de token
function showTokenSection(token) {
    hideAllSections();
    elements.tokenSection.style.display = 'block';
    elements.generatedToken.value = token;
    currentToken = token;
}

// Esconder todas as seções
function hideAllSections() {
    elements.loginSection.style.display = 'none';
    elements.forgotSection.style.display = 'none';
    elements.resetSection.style.display = 'none';
    elements.tokenSection.style.display = 'none';
}

// Limpar formulários
function clearForms() {
    const forms = [elements.loginForm, elements.forgotForm, elements.resetForm];
    forms.forEach(form => {
        if (form) form.reset();
    });
    
    // Resetar labels do MaterializeCSS
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('active');
    });
}

// Handler do login
async function handleLogin(event) {
    event.preventDefault();
    
    const username = elements.username.value.trim();
    const password = elements.password.value.trim();
    
    if (!username || !password) {
        showMessage('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    // Verificar se o usuário está bloqueado
    if (loginAttempts[username] && loginAttempts[username].blocked) {
        showMessage('Usuário bloqueado. Use "Esqueci minha senha" para desbloquear.', 'error');
        return;
    }
    
    try {
        const response = await axios.post('/api/login', {
            username: username,
            password: password
        });
        
        if (response.status === 200) {
            showMessage('Login realizado com sucesso!', 'success');
            // Resetar tentativas de login
            if (loginAttempts[username]) {
                delete loginAttempts[username];
            }
        }
        
    } catch (error) {
        handleLoginError(error, username);
    }
}

// Handler de erro do login
function handleLoginError(error, username) {
    if (!loginAttempts[username]) {
        loginAttempts[username] = { count: 0, blocked: false };
    }
    
    loginAttempts[username].count++;
    
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || 'Erro desconhecido';
        
        if (status === 423) {
            // Usuário bloqueado
            loginAttempts[username].blocked = true;
            showMessage('Usuário bloqueado após 3 tentativas. Use "Esqueci minha senha" para desbloquear.', 'error');
        } else if (status === 401) {
            // Credenciais inválidas
            const remainingAttempts = 3 - loginAttempts[username].count;
            if (remainingAttempts > 0) {
                showMessage(`Credenciais inválidas. Tentativas restantes: ${remainingAttempts}`, 'warning');
            } else {
                loginAttempts[username].blocked = true;
                showMessage('Usuário bloqueado após 3 tentativas. Use "Esqueci minha senha" para desbloquear.', 'error');
            }
        } else {
            showMessage(message, 'error');
        }
    } else {
        showMessage('Erro de conexão com a API', 'error');
    }
}

// Handler do esqueci minha senha
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const username = elements.forgotUsername.value.trim();
    
    if (!username) {
        showMessage('Por favor, digite o nome de usuário', 'error');
        return;
    }
    
    try {
        const response = await axios.post('/api/forgot-password', {
            username: username
        });
        
        if (response.status === 200) {
            const token = response.data.token;
            showTokenSection(token);
            showMessage('Token gerado com sucesso!', 'success');
        }
        
    } catch (error) {
        if (error.response && error.response.status === 404) {
            showMessage('Usuário não encontrado', 'error');
        } else {
            showMessage('Erro ao gerar token', 'error');
        }
    }
}

// Handler do reset de senha
async function handleResetPassword(event) {
    event.preventDefault();
    
    const username = elements.resetUsername.value.trim();
    const token = elements.resetToken.value.trim();
    const newPassword = elements.newPassword.value;
    const confirmPassword = elements.confirmPassword.value;
    
    if (!username || !token || !newPassword || !confirmPassword) {
        showMessage('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showMessage('As senhas não coincidem', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showMessage('A senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }
    
    try {
        const response = await axios.post('/api/reset-password', {
            username: username,
            token: token,
            newPassword: newPassword
        });
        
        if (response.status === 200) {
            showMessage('Senha redefinida com sucesso!', 'success');
            // Desbloquear usuário localmente
            if (loginAttempts[username]) {
                delete loginAttempts[username];
            }
            setTimeout(() => {
                showLoginSection();
            }, 2000);
        }
        
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            if (status === 400) {
                showMessage('Token inválido', 'error');
            } else if (status === 404) {
                showMessage('Usuário não encontrado', 'error');
            } else {
                showMessage(error.response.data.message || 'Erro ao redefinir senha', 'error');
            }
        } else {
            showMessage('Erro de conexão com a API', 'error');
        }
    }
}

// Copiar token para clipboard
function copyTokenToClipboard() {
    const token = elements.generatedToken.value;
    navigator.clipboard.writeText(token).then(() => {
        showMessage('Token copiado para a área de transferência!', 'success');
    }).catch(() => {
        showMessage('Erro ao copiar token', 'error');
    });
}

// Mostrar mensagem
function showMessage(message, type = 'info') {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="material-icons tiny left">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</i>
        ${message}
    `;
    
    // Inserir no início do container
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Verificar status da API periodicamente
setInterval(checkApiStatus, 30000); // Verificar a cada 30 segundos 
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;
const API_BASE_URL = 'http://localhost:3000';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para verificar status da API
app.get('/api-status', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api-docs`);
        res.json({ status: 'online', message: 'API está funcionando' });
    } catch (error) {
        res.status(500).json({ 
            status: 'offline', 
            message: 'API não está disponível. Certifique-se de que a API está rodando em http://localhost:3000' 
        });
    }
});

// Proxy para login
app.post('/api/login', async (req, res) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Erro de conexão com a API' });
        }
    }
});

// Proxy para forgot-password
app.post('/api/forgot-password', async (req, res) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/forgot-password`, req.body);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Erro de conexão com a API' });
        }
    }
});

// Proxy para reset-password
app.post('/api/reset-password', async (req, res) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reset-password`, req.body);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Erro de conexão com a API' });
        }
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📱 Aplicação web de gestão de login`);
    console.log(`🔗 Certifique-se de que a API está rodando em http://localhost:3000`);
}); 
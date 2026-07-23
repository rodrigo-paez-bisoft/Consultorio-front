// JS/api.js
const API_BASE_URL = 'https://localhost:7285';

const API = {
    auth: { login: `${API_BASE_URL}/api/auth/` },
    usuarios: { base: `${API_BASE_URL}/api/usuarios`, registrar: `${API_BASE_URL}/api/usuarios/registrar` },
    doctores: { base: `${API_BASE_URL}/api/doctores` },
    pacientes: { base: `${API_BASE_URL}/api/pacientes` },
    salas: { base: `${API_BASE_URL}/api/salas` },
    citas: { base: `${API_BASE_URL}/api/citas` }
};

function getToken() {
    return localStorage.getItem('token');
}

function getAuthHeaders() {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('🔑 Token enviado:', token.substring(0, 30) + '...');
    } else {
        console.warn('⚠️ No hay token disponible');
    }
    return headers;
}

async function handleResponse(response) {
    console.log(`📡 ${response.url} -> Status: ${response.status}`);
    
    if (response.status === 204) return { success: true };
    
    // ✅ En 401 NO redirigir automáticamente, solo lanzar error
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    }

    const text = await response.text();
    if (!text || text.trim() === '') {
        if (response.ok) return { success: true };
        throw new Error(`Error ${response.status}`);
    }

    try {
        const data = JSON.parse(text);
        if (!response.ok) throw new Error(data.mensaje || data.message || `Error ${response.status}`);
        return data;
    } catch (parseError) {
        if (response.ok) return { success: true, data: text };
        throw new Error(`Error ${response.status}`);
    }
}

const ApiService = {
    async login(username, password) {
        console.log('🔐 Login para:', username);
        const response = await fetch(API.auth.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        return handleResponse(response);
    },

    async getUsuarios() {
        const response = await fetch(API.usuarios.base, { headers: getAuthHeaders() });
        return handleResponse(response);
    },

    async registrarUsuario(data) {
        const response = await fetch(API.usuarios.registrar, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async actualizarUsuario(id, data) {
        const response = await fetch(`${API.usuarios.base}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async eliminarUsuario(id) {
        const response = await fetch(`${API.usuarios.base}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    async getDoctores() {
        const response = await fetch(API.doctores.base, { headers: getAuthHeaders() });
        return handleResponse(response);
    },

    async registrarDoctor(data) {
        const response = await fetch(API.doctores.base, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async actualizarDoctor(id, data) {
        const response = await fetch(`${API.doctores.base}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async eliminarDoctor(id) {
        const response = await fetch(`${API.doctores.base}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    async getPacientes() {
        const response = await fetch(API.pacientes.base, { headers: getAuthHeaders() });
        return handleResponse(response);
    },

    async registrarPaciente(data) {
        const response = await fetch(API.pacientes.base, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async actualizarPaciente(id, data) {
        const response = await fetch(`${API.pacientes.base}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async eliminarPaciente(id) {
        const response = await fetch(`${API.pacientes.base}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    async getSalas() {
        const response = await fetch(API.salas.base, { headers: getAuthHeaders() });
        return handleResponse(response);
    },

    async registrarSala(data) {
        const response = await fetch(API.salas.base, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async actualizarSala(id, data) {
        const response = await fetch(`${API.salas.base}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async eliminarSala(id) {
        const response = await fetch(`${API.salas.base}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    async getCitas() {
        const response = await fetch(API.citas.base, { headers: getAuthHeaders() });
        return handleResponse(response);
    },

    async registrarCita(data) {
        const response = await fetch(API.citas.base, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async actualizarCita(id, data) {
        const response = await fetch(`${API.citas.base}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    async eliminarCita(id) {
        const response = await fetch(`${API.citas.base}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    }
};

// ✅ Funciones de autenticación - SIN redirección automática
function checkAuth() {
    const token = getToken();
    return token !== null && token !== undefined;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

function getUsuarioInfo() {
    try {
        const data = localStorage.getItem('usuario');
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

// Exportar
window.ApiService = ApiService;
window.checkAuth = checkAuth;
window.logout = logout;
window.getToken = getToken;
window.getUsuarioInfo = getUsuarioInfo;

console.log('✅ ApiService cargado');
console.log('📍 Login URL:', API.auth.login);
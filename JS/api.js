// JS/api.js
// Configuración de la API
const API_BASE_URL = 'https://localhost:7285/api';

// Endpoints
const API = {
    auth: {
        login: `${API_BASE_URL}/security/login`
    },
    usuarios: {
        base: `${API_BASE_URL}/usuarios`,
        registrar: `${API_BASE_URL}/usuarios/registrar`,
        activos: `${API_BASE_URL}/usuarios/activos`
    },
    doctores: {
        base: `${API_BASE_URL}/Doctor`
    },
    pacientes: {
        base: `${API_BASE_URL}/Paciente`
    },
    salas: {
        base: `${API_BASE_URL}/Sala`
    },
    citas: {
        base: `${API_BASE_URL}/Cita`
    }
};

// Obtener token del localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Headers con autenticación
function getAuthHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Función mejorada para manejar respuestas de la API
async function handleResponse(response) {
    // Para respuestas sin contenido (204 No Content)
    if (response.status === 204) {
        return { success: true };
    }

    // Verificar si la respuesta tiene contenido
    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') {
        // Respuesta vacía pero exitosa
        if (response.ok) {
            return { success: true };
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Intentar parsear JSON
    try {
        const text = await response.text();
        
        // Verificar si el texto está vacío
        if (!text || text.trim() === '') {
            if (response.ok) {
                return { success: true };
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Intentar parsear JSON
        const data = JSON.parse(text);
        
        if (!response.ok) {
            const errorMessage = data.mensaje || data.message || data.title || `Error ${response.status}`;
            throw new Error(errorMessage);
        }
        
        return data;
    } catch (parseError) {
        // Si falla el parseo JSON
        console.error('Error parsing JSON:', parseError);
        console.error('Response text:', text);
        
        if (response.ok) {
            return { success: true };
        }
        throw new Error(`Error al procesar la respuesta del servidor`);
    }
}

// Funciones de API con manejo mejorado
const ApiService = {
    // Autenticación
    async login(username, password) {
        try {
            const response = await fetch(API.auth.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Error de conexión con el servidor');
        }
    },

    // Usuarios
    async getUsuarios() {
        try {
            const response = await fetch(API.usuarios.base, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getUsuarios:', error);
            throw new Error('Error al cargar usuarios');
        }
    },

    async getUsuario(id) {
        try {
            const response = await fetch(`${API.usuarios.base}/${id}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getUsuario:', error);
            throw new Error('Error al cargar usuario');
        }
    },

    async getUsuarioByUsername(username) {
        try {
            const response = await fetch(`${API.usuarios.base}/username/${username}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getUsuarioByUsername:', error);
            throw new Error('Error al cargar usuario por nombre');
        }
    },

    async registrarUsuario(data) {
        try {
            const response = await fetch(API.usuarios.registrar, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error registrarUsuario:', error);
            throw new Error('Error al registrar usuario');
        }
    },

    async actualizarUsuario(id, data) {
        try {
            const response = await fetch(`${API.usuarios.base}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error actualizarUsuario:', error);
            throw new Error('Error al actualizar usuario');
        }
    },

    async cambiarPassword(id, data) {
        try {
            const response = await fetch(`${API.usuarios.base}/${id}/cambiar-password`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error cambiarPassword:', error);
            throw new Error('Error al cambiar contraseña');
        }
    },

    async eliminarUsuario(id) {
        try {
            const response = await fetch(`${API.usuarios.base}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error eliminarUsuario:', error);
            throw new Error('Error al eliminar usuario');
        }
    },

    // Doctores
    async getDoctores() {
        try {
            const response = await fetch(API.doctores.base, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getDoctores:', error);
            throw new Error('Error al cargar doctores');
        }
    },

    async getDoctor(id) {
        try {
            const response = await fetch(`${API.doctores.base}/${id}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getDoctor:', error);
            throw new Error('Error al cargar doctor');
        }
    },

    async registrarDoctor(data) {
        try {
            const response = await fetch(API.doctores.base, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error registrarDoctor:', error);
            throw new Error('Error al registrar doctor');
        }
    },

    async actualizarDoctor(id, data) {
        try {
            const response = await fetch(`${API.doctores.base}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error actualizarDoctor:', error);
            throw new Error('Error al actualizar doctor');
        }
    },

    async eliminarDoctor(id) {
        try {
            const response = await fetch(`${API.doctores.base}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error eliminarDoctor:', error);
            throw new Error('Error al eliminar doctor');
        }
    },

    // Pacientes
    async getPacientes() {
        try {
            const response = await fetch(API.pacientes.base, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getPacientes:', error);
            throw new Error('Error al cargar pacientes');
        }
    },

    async getPaciente(id) {
        try {
            const response = await fetch(`${API.pacientes.base}/${id}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getPaciente:', error);
            throw new Error('Error al cargar paciente');
        }
    },

    async registrarPaciente(data) {
        try {
            const response = await fetch(API.pacientes.base, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error registrarPaciente:', error);
            throw new Error('Error al registrar paciente');
        }
    },

    async actualizarPaciente(id, data) {
        try {
            const response = await fetch(`${API.pacientes.base}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error actualizarPaciente:', error);
            throw new Error('Error al actualizar paciente');
        }
    },

    async eliminarPaciente(id) {
        try {
            const response = await fetch(`${API.pacientes.base}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error eliminarPaciente:', error);
            throw new Error('Error al eliminar paciente');
        }
    },

    // Salas
    async getSalas() {
        try {
            const response = await fetch(API.salas.base, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getSalas:', error);
            throw new Error('Error al cargar salas');
        }
    },

    async getSala(id) {
        try {
            const response = await fetch(`${API.salas.base}/${id}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getSala:', error);
            throw new Error('Error al cargar sala');
        }
    },

    async registrarSala(data) {
        try {
            const response = await fetch(API.salas.base, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error registrarSala:', error);
            throw new Error('Error al registrar sala');
        }
    },

    async actualizarSala(id, data) {
        try {
            const response = await fetch(`${API.salas.base}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error actualizarSala:', error);
            throw new Error('Error al actualizar sala');
        }
    },

    async eliminarSala(id) {
        try {
            const response = await fetch(`${API.salas.base}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error eliminarSala:', error);
            throw new Error('Error al eliminar sala');
        }
    },

    // Citas
    async getCitas() {
        try {
            const response = await fetch(API.citas.base, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getCitas:', error);
            throw new Error('Error al cargar citas');
        }
    },

    async getCita(id) {
        try {
            const response = await fetch(`${API.citas.base}/${id}`, {
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error getCita:', error);
            throw new Error('Error al cargar cita');
        }
    },

    async registrarCita(data) {
        try {
            const response = await fetch(API.citas.base, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error registrarCita:', error);
            throw new Error('Error al registrar cita');
        }
    },

    async actualizarCita(id, data) {
        try {
            const response = await fetch(`${API.citas.base}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error actualizarCita:', error);
            throw new Error('Error al actualizar cita');
        }
    },

    async eliminarCita(id) {
        try {
            const response = await fetch(`${API.citas.base}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error eliminarCita:', error);
            throw new Error('Error al eliminar cita');
        }
    },

    // Health check
    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            return handleResponse(response);
        } catch (error) {
            console.error('Error healthCheck:', error);
            throw new Error('Error al verificar estado del servidor');
        }
    }
};

// Verificar autenticación al cargar
function checkAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

// Exportar para uso global
window.ApiService = ApiService;
window.checkAuth = checkAuth;
window.logout = logout;
window.getToken = getToken;
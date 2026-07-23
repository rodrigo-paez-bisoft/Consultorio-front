// JS/auth.js
// Verificar autenticación en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Si no hay token y no está en login, redirigir
    if (!token && currentPage !== 'login.html') {
        window.location.href = 'login.html';
        return;
    }
    
    // Si hay token y está en login, redirigir al index
    if (token && currentPage === 'login.html') {
        window.location.href = 'index.html';
        return;
    }
    
    // Mostrar información del usuario
    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
        try {
            const usuario = JSON.parse(usuarioData);
            const userInfo = document.getElementById('userInfo');
            if (userInfo) {
                userInfo.innerHTML = `
                    <span class="badge bg-primary me-2">${usuario.rol || 'Usuario'}</span>
                    <span class="text-dark">${usuario.nombre || usuario.username}</span>
                `;
            }
        } catch (e) {
            console.error('Error al parsear usuario:', e);
        }
    }
});

// Función para cerrar sesión (disponible globalmente)
window.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
};
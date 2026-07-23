// JS/app.js
// Configuración de entidades
const ENTIDADES = {
    usuarios: {
        nombre: 'Usuarios',
        contenedor: 'contenedorUsuarios',
        archivos: {
            create: 'Usuario/create.html',
            read: 'Usuario/read.html',
            update: 'Usuario/update.html',
            delete: 'Usuario/delete.html'
        }
    },
    doctores: {
        nombre: 'Doctores',
        contenedor: 'contenedorDoctores',
        archivos: {
            create: 'Doctor/create.html',
            read: 'Doctor/read.html',
            update: 'Doctor/update.html',
            delete: 'Doctor/delete.html'
        }
    },
    pacientes: {
        nombre: 'Pacientes',
        contenedor: 'contenedorPacientes',
        archivos: {
            create: 'Paciente/create.html',
            read: 'Paciente/read.html',
            update: 'Paciente/update.html',
            delete: 'Paciente/delete.html'
        }
    },
    salas: {
        nombre: 'Salas',
        contenedor: 'contenedorSalas',
        archivos: {
            create: 'Sala/create.html',
            read: 'Sala/read.html',
            update: 'Sala/update.html',
            delete: 'Sala/delete.html'
        }
    },
    citas: {
        nombre: 'Citas',
        contenedor: 'contenedorCitas',
        archivos: {
            create: 'Cita/create.html',
            read: 'Cita/read.html',
            update: 'Cita/update.html',
            delete: 'Cita/delete.html'
        }
    }
};

// Cargar formulario
async function cargarFormulario(ruta, contenedorId) {
    try {
        const respuesta = await fetch(`Forms/${ruta}`);
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        const html = await respuesta.text();
        const contenedor = document.getElementById(contenedorId);
        if (contenedor) {
            contenedor.innerHTML = html;
            contenedor.dispatchEvent(new CustomEvent('formLoaded', {
                detail: { ruta, contenedorId }
            }));
        }
    } catch (error) {
        console.error(`Error cargando ${ruta}:`, error);
        const contenedor = document.getElementById(contenedorId);
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    Error al cargar el formulario: ${error.message}
                </div>
            `;
        }
    }
}

// Generar sub-acordeón CRUD
function generarSubAcordeonCRUD(entidad) {
    const operaciones = [
        { id: 'create', icono: 'bi-plus-circle-fill', color: 'success', label: 'Crear' },
        { id: 'read', icono: 'bi-eye-fill', color: 'primary', label: 'Consultar' },
        { id: 'update', icono: 'bi-pencil-fill', color: 'warning', label: 'Actualizar' },
        { id: 'delete', icono: 'bi-trash-fill', color: 'danger', label: 'Eliminar' }
    ];

    const items = operaciones.map((op, index) => {
        const isFirst = index === 0;
        const contenedorId = `${entidad.contenedor}${op.id.charAt(0).toUpperCase() + op.id.slice(1)}`;
        const collapsId = `${entidad.nombre.toLowerCase()}${op.id.charAt(0).toUpperCase() + op.id.slice(1)}`;

        return `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${isFirst ? '' : 'collapsed'}" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#${collapsId}" 
                            aria-expanded="${isFirst ? 'true' : 'false'}">
                        <i class="bi ${op.icono} text-${op.color} me-2"></i> 
                        ${op.label} ${entidad.nombre}
                    </button>
                </h2>
                <div id="${collapsId}" 
                     class="accordion-collapse collapse ${isFirst ? 'show' : ''}" 
                     data-bs-parent="#crud${entidad.nombre}">
                    <div class="accordion-body">
                        <div id="${contenedorId}">
                            <!-- Cargado dinámicamente -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    return `
        <div class="accordion" id="crud${entidad.nombre}">
            ${items.join('')}
        </div>
    `;
}

// Cargar todas las entidades
function cargarTodasLasEntidades() {
    Object.entries(ENTIDADES).forEach(([key, entidad]) => {
        const contenedor = document.getElementById(entidad.contenedor);
        if (contenedor) {
            contenedor.innerHTML = generarSubAcordeonCRUD(entidad);
            
            Object.entries(entidad.archivos).forEach(([operacion, ruta]) => {
                const contenedorId = `${entidad.contenedor}${operacion.charAt(0).toUpperCase() + operacion.slice(1)}`;
                setTimeout(() => {
                    cargarFormulario(ruta, contenedorId);
                }, 100);
            });
        }
    });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    if (!window.checkAuth()) {
        return;
    }
    cargarTodasLasEntidades();
});
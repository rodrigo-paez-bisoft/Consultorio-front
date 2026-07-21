async function cargarFormulario(nombreArchivo, contenedorId) {
    const respuesta = await fetch(`Forms/${nombreArchivo}`);
    const html = await respuesta.text();
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
        contenedor.innerHTML = html;
    }
}

// Cargar todos los formularios al iniciar
cargarFormulario("doctor-form.html", "contenedorDoctor");
cargarFormulario("Paciente-form.html", "contenedorPaciente");
cargarFormulario("Sala-form.html", "contenedorSala"); // Agrega más aquí
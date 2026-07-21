async function cargarFormulario(nombreArchivo) {
    const respuesta = await fetch(`Forms/${nombreArchivo}`);
    const html = await respuesta.text();
    const contenedor = document.getElementById("contenedorFormulario");
    if (contenedor) {
        contenedor.innerHTML += html; // Usa += para agregar en lugar de sobrescribir
    }
}

// Puedes agregar cuantos formularios quieras
cargarFormulario("doctor-form.html");
cargarFormulario("Paciente-form.html");
//cargarFormulario("otro-formulario.html"); // Agrega más aquí
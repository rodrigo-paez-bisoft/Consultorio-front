async function cargarFormulario() {
    const respuesta = await fetch("Forms/doctor-form.html");
    const html = await respuesta.text();
    const contenedor = document.getElementById("contenedorFormulario");
    if (contenedor) {
        contenedor.innerHTML = html;
    }
}
cargarFormulario();

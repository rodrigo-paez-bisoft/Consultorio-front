async function cargarFormulario(nombre: string): Promise<void> {
    const respuesta = await fetch(`Forms/${nombre}`);
    const html = await respuesta.text();

    const contenedor = document.getElementById("contenedorFormulario");

    if (contenedor) {
        contenedor.innerHTML = html;
    }
}
cargarFormulario("doctor-form.html");
cargarFormulario("Paciente-form.html");
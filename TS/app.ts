async function cargarFormulario(nombre: string): Promise<void> {
    const respuesta = await fetch(`Forms/${nombre}`);
    const html = await respuesta.text();

    const contenedor = document.getElementById("contenedorFormulario");

    if (contenedor) {
        contenedor.innerHTML += html; // Usa += en lugar de =
    }
}

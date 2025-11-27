// Cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {

    const homeSection = document.getElementById("home-section");
    const trabajadorSection = document.getElementById("trabajador-section");
    const empresaSection = document.getElementById("empresa-section");

    const btnHome = document.getElementById("btn-home");
    const btnTrabajador = document.getElementById("btn-trabajador");
    const btnEmpresa = document.getElementById("btn-empresa");

    const homeTrabajador = document.getElementById("home-trabajador");
    const homeEmpresa = document.getElementById("home-empresa");

    const formTrabajador = document.getElementById("form-trabajador");
    const formEmpresa = document.getElementById("form-empresa");

    // Función para mostrar una sección y ocultar las demás
    function mostrarSeccion(seccion) {
        homeSection.classList.remove("active");
        trabajadorSection.classList.remove("active");
        empresaSection.classList.remove("active");

        if (seccion === "home") homeSection.classList.add("active");
        if (seccion === "trabajador") trabajadorSection.classList.add("active");
        if (seccion === "empresa") empresaSection.classList.add("active");
    }

    // Navegación superior
    btnHome.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSeccion("home");
    });

    btnTrabajador.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSeccion("trabajador");
    });

    btnEmpresa.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarSeccion("empresa");
    });

    // Botones de la portada
    homeTrabajador.addEventListener("click", () => {
        mostrarSeccion("trabajador");
    });

    homeEmpresa.addEventListener("click", () => {
        mostrarSeccion("empresa");
    });

    // Envío formulario trabajador
    formTrabajador.addEventListener("submit", (e) => {
        e.preventDefault(); // evitamos recargar la página
        alert("Gracias por registrarte en Workply como trabajador. (Demo sin guardar en base de datos)");
        formTrabajador.reset();
        mostrarSeccion("home");
    });

    // Envío formulario empresa
    formEmpresa.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Gracias por registrar tu empresa en Workply. (Demo sin guardar en base de datos)");
        formEmpresa.reset();
        mostrarSeccion("home");
    });
});

// --- Navegación entre secciones ---
const menuButtons = document.querySelectorAll(".menu-btn");
const sections = document.querySelectorAll(".section");

// función común para cambiar de sección
function mostrarSeccion(idSeccion) {
    // activar botón del menú
    menuButtons.forEach((b) => {
        const target = b.getAttribute("data-section");
        if (target === idSeccion) {
            b.classList.add("active");
        } else {
            b.classList.remove("active");
        }
    });

    // mostrar sección correspondiente
    sections.forEach((sec) => {
        if (sec.id === idSeccion) {
            sec.classList.add("visible");
        } else {
            sec.classList.remove("visible");
        }
    });
}

// eventos de los botones del menú
menuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-section");
        mostrarSeccion(target);
    });
});

// --- Datos de ejemplo de ofertas (TRABAJADORES, sin BBDD todavía) ---
const ofertasDemo = [
    {
        puesto: "Operario/a de producción",
        ciudad: "Zafra",
        descripcion: "Trabajo a turnos en planta industrial. No se requiere experiencia previa. Formación a cargo de la empresa."
    },
    {
        puesto: "Técnico/a de mantenimiento",
        ciudad: "Badajoz",
        descripcion: "Mantenimiento preventivo y correctivo de maquinaria industrial. Se valorará experiencia con autómatas Siemens."
    },
    {
        puesto: "Programador/a Java junior",
        ciudad: "Madrid",
        descripcion: "Desarrollo de aplicaciones internas. Imprescindible conocimientos básicos de Java y se valorará Spring Boot."
    },
    {
        puesto: "Administrativo/a de logística",
        ciudad: "Sevilla",
        descripcion: "Gestión de albaranes, seguimiento de envíos y atención a clientes. Horario intensivo de mañana."
    },
    {
        puesto: "Mozo/a de almacén",
        ciudad: "Mérida",
        descripcion: "Carga y descarga, preparación de pedidos y control de stock. Valorable manejo de carretilla elevadora."
    },
    {
        puesto: "Ingeniero/a de procesos",
        ciudad: "Bilbao",
        descripcion: "Análisis y mejora de procesos productivos. Se busca perfil con enfoque Lean Manufacturing."
    },
    {
        puesto: "Operario/a de calidad",
        ciudad: "Zaragoza",
        descripcion: "Revisión de piezas, uso de instrumentos de medición y cumplimentación de registros de calidad."
    },
    {
        puesto: "Supervisor/a de turno",
        ciudad: "Valencia",
        descripcion: "Coordinación de equipo de producción, control de paradas y reporte de indicadores diarios."
    },
    {
        puesto: "Técnico/a de soporte IT",
        ciudad: "Barcelona",
        descripcion: "Soporte a usuarios, gestión de incidencias y mantenimiento básico de equipos y redes."
    },
    {
        puesto: "Operario/a carretillero",
        ciudad: "Cáceres",
        descripcion: "Gestión de pallets y movimientos internos de material. Imprescindible carnet de carretillero en vigor."
    }
];

const listaOfertas = document.getElementById("listaOfertas");
const ofertasDestacadasDiv = document.getElementById("ofertasDestacadas");

// pinta las ofertas en la sección de trabajadores
function mostrarOfertas(ofertas) {
    listaOfertas.innerHTML = "";

    if (ofertas.length === 0) {
        listaOfertas.innerHTML = "<p>No se han encontrado ofertas con esos filtros.</p>";
        return;
    }

    ofertas.forEach((oferta) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h2>${oferta.puesto}</h2>
            <p><strong>Ciudad:</strong> ${oferta.ciudad}</p>
            <p>${oferta.descripcion}</p>
        `;
        listaOfertas.appendChild(div);
    });
}

// mostrar todas al entrar en la sección de trabajadores
mostrarOfertas(ofertasDemo);

// Mostrar ofertas destacadas en la portada (por ejemplo, las 3 primeras)
function mostrarOfertasDestacadas() {
    if (!ofertasDestacadasDiv) return;

    ofertasDestacadasDiv.innerHTML = "";

    const destacadas = ofertasDemo.slice(0, 3); // primeras 3

    destacadas.forEach((oferta) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h2>${oferta.puesto}</h2>
            <p><strong>Ciudad:</strong> ${oferta.ciudad}</p>
            <p>${oferta.descripcion}</p>
        `;
        ofertasDestacadasDiv.appendChild(div);
    });
}

mostrarOfertasDestacadas();

// filtros de trabajadores
const filtroPalabra = document.getElementById("filtroPalabra");
const filtroCiudad = document.getElementById("filtroCiudad");
const btnBuscarOfertas = document.getElementById("btnBuscarOfertas");

btnBuscarOfertas.addEventListener("click", () => {
    const texto = filtroPalabra.value.toLowerCase();
    const ciudad = filtroCiudad.value.toLowerCase();

    const filtradas = ofertasDemo.filter((oferta) => {
        const coincideTexto =
            texto === "" ||
            oferta.puesto.toLowerCase().includes(texto) ||
            oferta.descripcion.toLowerCase().includes(texto);

        const coincideCiudad =
            ciudad === "" || oferta.ciudad.toLowerCase().includes(ciudad);

        return coincideTexto && coincideCiudad;
    });

    mostrarOfertas(filtradas);
});

// --- Zona EMPRESAS: ofertas de ejemplo + formulario ---
// Ofertas que ya aparecen creadas al entrar
let ofertasEmpresa = [
    {
        puesto: "Responsable de almacén",
        ciudad: "Sevilla",
        descripcion: "Gestión de equipo de mozos, organización de entradas y salidas de material, coordinación con transporte."
    },
    {
        puesto: "Jefe/a de línea de montaje",
        ciudad: "Zafra",
        descripcion: "Planificación diaria de la producción, gestión de incidencias y reporte de indicadores a jefatura."
    },
    {
        puesto: "Técnico/a de calidad cliente",
        ciudad: "Madrid",
        descripcion: "Gestión de reclamaciones de cliente, análisis de causas y seguimiento de acciones correctivas."
    }
];

const formOferta = document.getElementById("formOferta");
const ofertasEmpresaDiv = document.getElementById("ofertasEmpresa");

formOferta.addEventListener("submit", (e) => {
    e.preventDefault();

    const puesto = document.getElementById("ofertaPuesto").value;
    const ciudad = document.getElementById("ofertaCiudad").value;
    const descripcion = document.getElementById("ofertaDescripcion").value;

    const nueva = { puesto, ciudad, descripcion };
    ofertasEmpresa.push(nueva);

    pintarOfertasEmpresa();
    formOferta.reset();
});

function pintarOfertasEmpresa() {
    ofertasEmpresaDiv.innerHTML = "";

    if (ofertasEmpresa.length === 0) {
        ofertasEmpresaDiv.innerHTML = "<p>Todavía no has creado ninguna oferta.</p>";
        return;
    }

    ofertasEmpresa.forEach((oferta) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h2>${oferta.puesto}</h2>
            <p><strong>Ciudad:</strong> ${oferta.ciudad}</p>
            <p>${oferta.descripcion}</p>
        `;
        ofertasEmpresaDiv.appendChild(div);
    });
}

// Mostrar las ofertas de empresa iniciales al cargar
pintarOfertasEmpresa();

// --- Hacer clic en las tarjetas de INICIO para navegar ---
const cardTrabajadores = document.getElementById("cardTrabajadores");
const cardEmpresas = document.getElementById("cardEmpresas");

if (cardTrabajadores) {
    cardTrabajadores.addEventListener("click", () => {
        mostrarSeccion("trabajadores");
    });
}

if (cardEmpresas) {
    cardEmpresas.addEventListener("click", () => {
        mostrarSeccion("empresas");
    });
}

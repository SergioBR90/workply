// --- Navegación entre secciones ---
const menuButtons = document.querySelectorAll(".menu-btn");
const sections = document.querySelectorAll(".section");

// aquí guardaremos las ofertas que vengan del backend
let ofertas = [];

// candidaturas y trabajadores (demo)
const candidaturasDemo = [];
const trabajadoresRegistrados = [];

function mostrarSeccion(idSeccion) {
    menuButtons.forEach((b) => {
        const target = b.getAttribute("data-section");
        b.classList.toggle("active", target === idSeccion);
    });

    sections.forEach((sec) => {
        sec.classList.toggle("visible", sec.id === idSeccion);
    });
}

menuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-section");
        mostrarSeccion(target);
    });
});

// --- Ofertas (BACKEND) ---
const listaOfertas = document.getElementById("listaOfertas");
const ofertasDestacadasDiv = document.getElementById("ofertasDestacadas");

function mostrarOfertas(ofertasParaPintar) {
    listaOfertas.innerHTML = "";

    if (!ofertasParaPintar || ofertasParaPintar.length === 0) {
        listaOfertas.innerHTML = "<p>No se han encontrado ofertas con esos filtros.</p>";
        return;
    }

    ofertasParaPintar.forEach((oferta) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h2>${oferta.puesto}</h2>
            <p><strong>Ciudad:</strong> ${oferta.ciudad}</p>
            <p>${oferta.descripcion}</p>
            <button class="btn-detalle" data-id="${oferta.id}">Ver detalle</button>
        `;
        listaOfertas.appendChild(div);
    });
}

function mostrarOfertasDestacadas() {
    if (!ofertasDestacadasDiv || ofertas.length === 0) return;

    ofertasDestacadasDiv.innerHTML = "";
    const destacadas = ofertas.slice(0, 3);

    destacadas.forEach((oferta) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h2>${oferta.puesto}</h2>
            <p><strong>Ciudad:</strong> ${oferta.ciudad}</p>
            <p>${oferta.descripcion}</p>
            <button class="btn-detalle" data-id="${oferta.id}">Ver detalle</button>
        `;
        ofertasDestacadasDiv.appendChild(div);
    });
}

// --- Zona EMPRESAS ---
const formOferta = document.getElementById("formOferta");
const ofertasEmpresaDiv = document.getElementById("ofertasEmpresa");

function pintarOfertasEmpresa() {
    ofertasEmpresaDiv.innerHTML = "";

    if (!ofertas || ofertas.length === 0) {
        ofertasEmpresaDiv.innerHTML = "<p>Todavía no hay ofertas en la base de datos.</p>";
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
        ofertasEmpresaDiv.appendChild(div);
    });
}

// cargar ofertas del backend
async function cargarOfertas() {
    try {
        const respuesta = await fetch("http://localhost:8080/api/ofertas");
        const datos = await respuesta.json();

        ofertas = datos;
        mostrarOfertas(ofertas);
        mostrarOfertasDestacadas();
        pintarOfertasEmpresa();
    } catch (error) {
        console.error("Error al cargar ofertas del backend:", error);
        listaOfertas.innerHTML = "<p>Error al cargar ofertas. Inténtalo más tarde.</p>";
    }
}

// llamamos una vez al cargar la página
cargarOfertas();

// --- Filtros de trabajadores ---
const filtroPalabra = document.getElementById("filtroPalabra");
const filtroCiudad = document.getElementById("filtroCiudad");
const btnBuscarOfertas = document.getElementById("btnBuscarOfertas");

btnBuscarOfertas.addEventListener("click", () => {
    const texto = filtroPalabra.value.toLowerCase();
    const ciudad = filtroCiudad.value.toLowerCase();

    const filtradas = ofertas.filter((oferta) => {
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

// --- Detalle de oferta ---
const detalleContenido = document.getElementById("detalleContenido");
const btnVolverOfertas = document.getElementById("btnVolverOfertas");

function pintarDetalleOferta(oferta) {
    if (!detalleContenido || !oferta) return;

    detalleContenido.innerHTML = `
        <h2>${oferta.puesto}</h2>
        <p><strong>Ciudad:</strong> ${oferta.ciudad}</p>
        <p>${oferta.descripcion}</p>
        <button class="btn-primario btn-detalle-contacto" data-id="${oferta.id}">
            Me interesa esta oferta
        </button>
        <p class="detalle-confirmacion" style="display:none;">
            Hemos registrado tu interés en la oferta. La empresa podrá ver tu candidatura.
        </p>
    `;

    const btnInteres = detalleContenido.querySelector(".btn-detalle-contacto");
    if (btnInteres) {
        btnInteres.addEventListener("click", () => {
            const idOferta = parseInt(btnInteres.dataset.id, 10);
            registrarInteres(idOferta);
        });
    }

    mostrarSeccion("detalleOferta");
}

btnVolverOfertas.addEventListener("click", () => {
    mostrarSeccion("trabajadores");
});

// registrar interés en una oferta
function registrarInteres(ofertaId) {
    const oferta = ofertas.find((o) => o.id === ofertaId);
    const trabajador =
        trabajadoresRegistrados[trabajadoresRegistrados.length - 1] || null;

    candidaturasDemo.push({
        ofertaId,
        ofertaTitulo: oferta ? oferta.puesto : "",
        trabajador,
        fecha: new Date().toISOString(),
        estado: "ENVIADA"
    });

    fetch(`http://localhost:8080/api/ofertas/${ofertaId}/interes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: trabajador ? trabajador.nombre : null,
            email: trabajador ? trabajador.email : null,
            ciudad: trabajador ? trabajador.ciudad : null,
            perfil: trabajador ? trabajador.perfil : null,
            experiencia: trabajador ? trabajador.experiencia : null
        })
    })
        .then((res) => {
            if (!res.ok) throw new Error("Error al registrar la candidatura en el backend");
            return res.json();
        })
        .then((data) => console.log("Candidatura registrada en el backend:", data))
        .catch((err) => console.error("Error al enviar la candidatura al backend:", err));

    const mensaje = detalleContenido.querySelector(".detalle-confirmacion");
    if (mensaje) mensaje.style.display = "block";

    alert(
        "Hemos registrado tu interés en esta oferta.\n\n" +
        "La candidatura también se ha enviado al servidor (demo)."
    );

    console.log("Candidaturas almacenadas (simulación frontend):", candidaturasDemo);
}

// Delegación de eventos para botones "Ver detalle"
listaOfertas.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-detalle")) {
        const id = parseInt(e.target.dataset.id, 10);
        const oferta = ofertas.find((o) => o.id === id);
        if (oferta) pintarDetalleOferta(oferta);
    }
});

ofertasDestacadasDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-detalle")) {
        const id = parseInt(e.target.dataset.id, 10);
        const oferta = ofertas.find((o) => o.id === id);
        if (oferta) pintarDetalleOferta(oferta);
    }
});

// cuando una empresa crea una oferta, la mandamos al backend
formOferta.addEventListener("submit", async (e) => {
    e.preventDefault();

    const puesto = document.getElementById("ofertaPuesto").value.trim();
    const ciudad = document.getElementById("ofertaCiudad").value.trim();
    const descripcion = document.getElementById("ofertaDescripcion").value.trim();

    if (!puesto || !ciudad || !descripcion) {
        alert("Rellena todos los campos de la oferta.");
        return;
    }

    try {
        const res = await fetch("http://localhost:8080/api/ofertas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ puesto, ciudad, descripcion })
        });

        if (!res.ok) throw new Error("Error al guardar la oferta en el servidor");

        const guardada = await res.json();

        ofertas.push(guardada);
        mostrarOfertas(ofertas);
        mostrarOfertasDestacadas();
        pintarOfertasEmpresa();

        alert("Oferta guardada correctamente en la base de datos.");
        formOferta.reset();
    } catch (err) {
        console.error(err);
        alert("Ha ocurrido un error al guardar la oferta.");
    }
});

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

// --- Registro de trabajadores (demo, sin BBDD) ---
const formRegistroTrabajador = document.getElementById("formRegistroTrabajador");

formRegistroTrabajador.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("regNombre").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const ciudad = document.getElementById("regCiudad").value.trim();
    const perfil = document.getElementById("regPerfil").value.trim();
    const experiencia = document.getElementById("regExperiencia").value.trim();

    trabajadoresRegistrados.push({
        nombre,
        email,
        ciudad,
        perfil,
        experiencia
    });

    alert("Perfil de trabajador guardado en la aplicación (sin BBDD por ahora).");
    formRegistroTrabajador.reset();
});

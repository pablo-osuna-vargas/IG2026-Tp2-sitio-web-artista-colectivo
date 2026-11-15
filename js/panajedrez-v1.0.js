// SIGNO EN CONSTRUCCIÓN
let signoActual = "";

// OBRA COMPLETA
let obra = [];

// ELEMENTOS HTML
const consonante = document.querySelector("#consonante");
const vocal = document.querySelector("#vocal");

const btnAgregar = document.querySelector("#btnAgregar");
const btnCerrar = document.querySelector("#btnCerrar");
const btnExponer = document.querySelector("#btnExponer");

const textoSigno = document.querySelector("#signoActual");
const contenedorObra = document.querySelector("#obra");

// FUNCIONES
function mostrarSignoActual() {
    textoSigno.textContent = signoActual;
}

function mostrarObra() {
    contenedorObra.innerHTML = "";

    for (let i = 0; i < obra.length; i++) {
        let parrafo = document.createElement("p");
        parrafo.textContent = obra[i];
        contenedorObra.append(parrafo);
    }
}

function agregarEmision() {
    let nuevaEmision = consonante.value + vocal.value;
    signoActual += nuevaEmision;

    mostrarSignoActual();
}

function cerrarSigno() {
    if (signoActual === "") {
        return;
    }
    obra.push(signoActual);
    signoActual = "";

    mostrarSignoActual();
    mostrarObra();
}

function exponerObra() {
    cerrarSigno();
    alert("La obra ha sido expuesta.\n" +
        "Cantidad de signos: " + obra.length);
}

// EVENTOS
btnAgregar.addEventListener("click", agregarEmision);
btnCerrar.addEventListener("click", cerrarSigno);
btnExponer.addEventListener("click", exponerObra);

// ESTADO INICIAL
mostrarSignoActual();
mostrarObra();
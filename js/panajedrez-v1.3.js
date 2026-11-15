// ========================
// DATOS
// ========================

let signoActual = [];
let obra = [];

// ========================
// TABLERO
// ========================

const vocales = [

    "AA",
    "EI",
    "OU",
    "IE",

    "UO",
    "AA",
    "EI",
    "OU",

    "IE",
    "UO",
    "AA",
    "EI"

];

let tablero = [];

    for (let i = 0; i < 12; i++) {
        tablero.push(null);
    }

// ========================
// DOM
// ========================

const consonante = document.querySelector("#consonante");
const contenedorTablero = document.querySelector("#tablero");
const textoSigno = document.querySelector("#signoActual");
const contenedorConstelacion =document.querySelector("#constelacion");
const contenedorObra = document.querySelector("#obra");
const btnCerrar = document.querySelector("#btnCerrar");
const btnExponer = document.querySelector("#btnExponer");


// ========================
// TABLERO
// ========================

function crearTablero() {
    contenedorTablero.innerHTML = "";
    for (let i = 0; i < vocales.length; i++) {
        let boton = document.createElement("button");
        boton.className = "col-3 btn btn-outline-secondary";
        boton.textContent = vocales[i];

        let posicion = i + 1;

        boton.addEventListener("click", function () {colocarEmision(posicion, boton);});
        contenedorTablero.append(boton);
    }
}


// ========================
// SIGNO
// ========================

function mostrarSignoActual() {
    let texto = "";
    for (let i = 0; i < signoActual.length; i++) {
        texto += signoActual[i].silaba;
    }

    textoSigno.textContent = texto;
}


// ========================
// OBRA
// ========================

function mostrarObra() {
    contenedorObra.innerHTML = "";
    for (let i = 0; i < obra.length; i++) {
        let texto = "";
        for (let j = 0; j < obra[i].length; j++) {
            texto += obra[i][j].silaba;
        }

        let p = document.createElement("p");
        p.textContent = texto;
        contenedorObra.append(p);
    }
}


// ========================
// EMISIONES
// ========================

function colocarEmision(posicion, boton) {
    let indice = posicion - 1;
    if (tablero[indice] !== null) {
        alert("Casilla ocupada");
        return;
    }

    let silaba = consonante.value + vocales[indice];
    let emision = {
        silaba: silaba,
        sonido: null,
        color: null,
        posicion: posicion
    };

    tablero[indice] = emision;
    signoActual.push(emision);
    boton.textContent = silaba;
    boton.classList.remove("btn-outline-secondary");
    boton.classList.add("btn-primary");

    mostrarSignoActual();
}


// ========================
// CERRAR SIGNO
// ========================

function cerrarSigno() {
    if (signoActual.length === 0) {
        return;
    }

    obra.push([...signoActual]);
    signoActual = [];

    mostrarSignoActual();
    mostrarObra();
}


// ========================
// EXPONER OBRA
// ========================

function exponerObra() {
    cerrarSigno();
    alert(
        "La obra ha sido expuesta.\n" +
        "Cantidad de signos: " + obra.length
    );
}


// ========================
// EVENTOS
// ========================

btnCerrar.addEventListener("click", cerrarSigno);
btnExponer.addEventListener("click", exponerObra);


// ========================
// INICIO
// ========================

crearTablero();
mostrarSignoActual();
mostrarObra();
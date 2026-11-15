// ========================
// DATOS
// ========================

let signoActual = []; // contiene los signos cerrados para renderizar en pantalla
let obra = []; // contiene los signos que la componen
let nodosObra = []; // contiene los nodos (posiciones) activadas por el ususario
let conexionesObra = []; // contiene los pares de nodos en relación (es decir conectados entre sí) par: origen, destino

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
const contenedorNodosActivos = document.querySelector("#nodosActivos");
const contenedorConexiones = document.querySelector("#conexiones");
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
    nodosObra.push(emision.posicion);

    crearConexion();
    mostrarConexiones()

    boton.textContent = silaba;
    boton.classList.remove("btn-outline-secondary");
    boton.classList.add("btn-primary");

    mostrarSignoActual();
    mostrarNodosActivos();
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
    mostrarNodosActivos();
    mostrarObra();
}


// ========================
// NODOS ACTIVOS
// ========================

function mostrarNodosActivos() {
    contenedorNodosActivos.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        let nodo = document.createElement("div");
        nodo.className = "col-3 text-center border p-3";

        let activo = false;
        for (let j = 0; j < nodosObra.length; j++) {
            if (nodosObra[j] === i + 1) {
                activo = true;
            }
        }

        if (activo) {
            nodo.classList.add("bg-primary", "text-white");
        }

        contenedorNodosActivos.append(nodo);
    }
}


// ========================
// CONEXIONES
// ========================

function crearConexion() {
    if (nodosObra.length < 2) {
        return;
    }

    let origen = nodosObra[nodosObra.length - 2];
    let destino = nodosObra[nodosObra.length - 1];
    
    let conexion = [
        origen,
        destino
    ];

    conexionesObra.push(conexion);

    mostrarConexiones()
}


// ========================
// MOSTRAR CONEXIONES (CHEQUEO)
// ========================

function mostrarConexiones() {
    contenedorConexiones.innerHTML = "";
    for (let i = 0; i < conexionesObra.length; i++) {
        let p = document.createElement("p");
        p.textContent = conexionesObra[i][0] + " → " + conexionesObra[i][1];
        contenedorConexiones.append(p);
    }
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
mostrarNodosActivos(); // antes era mostrarConstelacionActual, pero era confuso porque no mostraba la constelación propiamente dicha sino un mapa de nodos activos
mostrarObra();
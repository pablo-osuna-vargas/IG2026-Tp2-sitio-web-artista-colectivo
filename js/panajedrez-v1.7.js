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
const contenedorRueda = document.querySelector("#ruedaConstelar");
const lienzoConstelar = document.querySelector("#lienzoConstelar");
const nodos = document.querySelector("#nodos");
const geografiaConstelar = {

    12: { left: 190, top: 10 },

    1:  { left: 270, top: 35 },

    2:  { left: 330, top: 90 },

    3:  { left: 355, top: 180 },

    4:  { left: 330, top: 270 },

    5:  { left: 270, top: 330 },

    6:  { left: 190, top: 355 },

    7:  { left: 110, top: 330 },

    8:  { left: 50,  top: 270 },

    9:  { left: 25,  top: 180 },

    10: { left: 50,  top: 90 },

    11: { left: 110, top: 35 }

};

const contenedorObra = document.querySelector("#obra");
const btnCerrar = document.querySelector("#btnCerrar");
const btnExponer = document.querySelector("#btnExponer");


// ========================
// CREAR TABLERO
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
// CREAR RUEDA CONSTELAR
// ========================

function crearRuedaConstelar() {
    nodos.innerHTML = "";

    for (let i = 1; i <= 12; i++) {
        let nodo = document.createElement("div");
        nodo.className = "nodo";
        nodo.style.left = geografiaConstelar[i].left + "px";
        nodo.style.top = geografiaConstelar[i].top + "px";

        let activo = false;
        for (let j = 0; j < nodosObra.length; j++) {
            if (nodosObra[j] === i) {
                activo = true;
            }
        }

        if (activo) {
            nodo.classList.add("nodo-activo");
        }
        
        nodos.append(nodo);
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
    mostrarConexiones();
    crearRuedaConstelar();

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

    mostrarConexiones();
    dibujarLinea(origen, destino);
}


// =========================
// LINEAS SVG
// =========================

function dibujarLinea(origen, destino) {

    let nodoOrigen = geografiaConstelar[origen];
    let nodoDestino = geografiaConstelar[destino];

    let x1 = nodoOrigen.left + 12;
    let y1 = nodoOrigen.top + 12;

    let x2 = nodoDestino.left + 12;
    let y2 = nodoDestino.top + 12;

    let linea = document.createElementNS("http://www.w3.org/2000/svg", "line");

    linea.setAttribute("x1", x1);
    linea.setAttribute("y1", y1);

    linea.setAttribute("x2", x2);
    linea.setAttribute("y2", y2);

    linea.setAttribute("stroke", "gold");
    linea.setAttribute("stroke-width", "3");

    lienzoConstelar.append(linea);
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
crearRuedaConstelar();
mostrarSignoActual();
mostrarNodosActivos(); 
mostrarObra();
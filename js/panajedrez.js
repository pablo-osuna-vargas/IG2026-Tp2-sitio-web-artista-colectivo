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

const vocales = ["AA","EI","OU","IE","UO","AA","EI","OU","IE","UO","AA","EI"];
const sonidos = ["1","2","3","4","5","6","7","8","9","Q","&","IO"];
const signos = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

let tablero = [];
    for (let i = 0; i < 144; i++) {
        tablero.push(null);
    }

// ========================
// DOM
// ========================

const header = document.querySelector("header");
const footer = document.querySelector("footer");
const panel = document.querySelector("#panel");
const consonante = document.querySelector("#consonante");
const contenedorTablero = document.querySelector("#tablero");
const ejeHorizontal = document.querySelector("#ejeHorizontal");
const ejeVertical = document.querySelector("#ejeVertical");
const textoSigno = document.querySelector("#signoActual");
const contenedorRueda = document.querySelector("#ruedaConstelar");
const lienzoConstelar = document.querySelector("#lienzoConstelar");
const nodos = document.querySelector("#nodos");
const btnRecrear = document.querySelector("#btnRecrear");
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
const btnRevelar = document.querySelector("#btnRevelar");


// ========================\\r 
// CREAR TABLERO (12x12: Filas = Nodos, Columnas = Sonidos)\\r 
// ========================\\r 
function crearTablero() { 
    contenedorTablero.innerHTML = ""; 
    
    // 12 Filas (Cada fila = 1 Nodo / Signo del 1 al 12) 
    for (let fila = 0; fila < 12; fila++) { 
        let filaDiv = document.createElement("div"); 
        filaDiv.className = "row g-1 mb-1"; // Fila nativa de Bootstrap con espaciado ajustado 
    
        let posicionNodo = fila + 1; // Asigna el Nodo (1 a 12) según la fila 

    // 12 Columnas (Cada columna = 1 Sonido / Frecuencia del 1 al 12) 
    for (let col = 0; col < 12; col++) { 
        let boton = document.createElement("button"); 
        boton.className = "col-1 btn btn-sm btn-outline-secondary p-1 text-center"; 
        boton.textContent = vocales[col];

        let indiceGlobal = (fila * 12) + col;

        // Al hacer clic, se envía la posicionNodo (1-12) correspondiente a la fila 
        boton.addEventListener("click", function () {colocarEmision(posicionNodo, boton, indiceGlobal);}); 

        filaDiv.append(boton);
        } 

    contenedorTablero.append(filaDiv); 
    } 
}


// ========================
// CREAR EJES
// ========================

function crearEjes() {
    ejeHorizontal.innerHTML = "";
    ejeVertical.innerHTML = "";

    for(let i = 0; i < sonidos.length; i++){
        let celda = document.createElement("div");
        celda.className = "col-1 text-center";
        celda.textContent = sonidos[i];
        ejeHorizontal.append(celda);
    }

    for(let i = 0; i < signos.length; i++){
        let celda = document.createElement("div");
        celda.className = "text-center d-flex align-items-center justify-content-center mb-1";
        celda.textContent = signos[i];

        ejeVertical.append(celda);
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
        p.classList = "text-center";
        contenedorObra.append(p);
    }
}


// ========================
// EMISIONES (sílabas)
// ========================

/*function colocarEmision(posicion, boton) {
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
    crearRuedaConstelar();

    boton.textContent = silaba;
    boton.classList.remove("btn-outline-secondary");
    boton.classList.add("btn-outline-warning");

    mostrarSignoActual();
}*/


function colocarEmision(posicion, boton, indiceGlobal) { 
    if (tablero[indiceGlobal] !== null) { 
        alert("Casilla ocupada"); 
        return; 
    } 

    let silaba = consonante.value + vocales[indiceGlobal % 12]; 
    let emision = { 
        silaba: silaba, 
        sonido: null, 
        color: null, 
        posicion: posicion 
    }; 

    tablero[indiceGlobal] = emision; 
    signoActual.push(emision); 
    nodosObra.push(emision.posicion); 
    
    crearConexion(); 
    crearRuedaConstelar(); 
    
    boton.textContent = silaba; 
    boton.classList.remove("btn-outline-secondary"); 
    boton.classList.add("btn-outline-warning"); 

    mostrarSignoActual(); }

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
// CONEXIONES
// ========================
/*
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

    dibujarLinea(origen, destino);
}*/


function crearConexion() { 
    if (nodosObra.length < 2) { 
        return; 
    } 

    let origen = nodosObra[nodosObra.length - 2]; 
    let destino = nodosObra[nodosObra.length - 1]; 

    if (origen !== destino) { 
        let conexion = [origen, destino]; 

        conexionesObra.push(conexion); 
        dibujarLinea(origen, destino); 
    } 
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
// REVELAR OBRA
// ========================

function revelarObra() {
    cerrarSigno();
    
    header.remove();
    panel.remove();
    footer.remove();
    
    contenedorRueda.style.display = "block";
    btnRecrear.style.display = "block";

    alert(
        "La obra ha sido revelada.\n" +
        "Cantidad de signos: " + obra.length
    );
}


// ========================
// EVENTOS
// ========================

btnCerrar.addEventListener("click", cerrarSigno);
btnRevelar.addEventListener("click", revelarObra);
btnRecrear.addEventListener("click", function() {location.reload()});


// ========================
// INICIO
// ========================

crearTablero();
crearEjes();
crearRuedaConstelar();
mostrarSignoActual();
mostrarObra();
// ========================
// DATOS
// ========================
let signoActual = []; // contiene los signos cerrados para renderizar en pantalla
let obra = []; // contiene los signos que la componen
let nodosObra = []; // contiene los nodos (posiciones) activadas por el ususario
let conexionesObra = []; // contiene los pares de nodos en relación (es decir conectados entre sí) par: origen, destino
let consonanteActiva = null; // inicia sin ninguna ficha "seleccionada"
let reproductorInterval = null; // inicia sin ningún sonido previo
    
// ========================
// TABLERO
// ========================
const vocales = ["AA","EI","OU","IE","UO","AA","EI","OU","IE","UO","AA","EI"];
const consonantes = ["B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"];
const signos = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

const sonidos = ["1","2","3","4","5","6","7","8","9","Q","&","IO"];
const frecuencias = ["261.63", "277.18", "293.66","311.13", "329.63","349.23","369.99","392.00","415.30","440.00","466.16","493.88"];
const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // Web Audio API, Emite sonido sintetizado con envolvente

let tablero = [];
    for (let i = 0; i < 144; i++) {
        tablero.push(null);
    }

// ========================
// DOM
// ========================
const reglas = document.querySelector("#reglas");
const btnCrearCosmos = document.querySelector("#btnCrearCosmos");

const header = document.querySelector("header");
const footer = document.querySelector("footer");
const panel = document.querySelector("#panel");
const poema = document.querySelector ("#poema");
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
const btnRevelar = document.querySelector("#btnRevelar");
const btnCerrar = document.querySelector("#btnCerrar");


// ==================================================
// CREAR TABLERO (12x12 fila=signo; columna=sonido)
// ==================================================
function crearTablero() { 
    contenedorTablero.innerHTML = ""; 
     
    for (let fila = 0; fila < 12; fila++) { 
        let filaDiv = document.createElement("div"); 
        filaDiv.className = "row"; // Fila Bootstrap con espaciado 
    
        let posicionNodo = fila + 1; // Asigna el Nodo (1 a 12) según la fila 

    for (let col = 0; col < 12; col++) { 
        let boton = document.createElement("button"); 
        boton.className = "col-1 btn btn-sm btn-outline-secondary p-2 text-center"; 
        boton.textContent = vocales[col];

        let indiceGlobal = (fila * 12) + col;

        boton.addEventListener("click", function () {colocarEmision(posicionNodo, col, boton, indiceGlobal);}); // Al hacer clic, se envía posicionNodo (1-12) correspondiente a la fila 
        boton.addEventListener("dragover", function (e) {e.preventDefault();}); // EVENTO DRAGOVER (OBLIGATORIO PARA AUTORIZAR EL DROP) 
        boton.addEventListener("drop", function (e) {e.preventDefault(); // EVENTO DROP (RECUPERA LA CONSONANTE Y COLOCA LA EMISIÓN)

        let consonanteArrastrada = e.dataTransfer.getData("consonante"); 
 
        colocarEmision(posicionNodo, col, boton, indiceGlobal, consonanteArrastrada);}); // Ejecuta la emisión enviándole la consonante arrastrada

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
        celda.className = "col-1";
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


//===============================
// CREAR FICHAS
//===============================
function crearFichas() {
    let contenedor = document.querySelector("#fichas");
    contenedor.innerHTML = "";

    for(let i = 0; i < consonantes.length; i++) {
        let ficha = document.createElement("button");
        ficha.textContent = consonantes[i];
        ficha.className = "btn btn-outline-primary";
 
        // drag & drop
        ficha.setAttribute("draggable", "true"); // Atributo HTML obligatorio de arrastrar 
        ficha.addEventListener("dragstart", function (e) {e.dataTransfer.setData("consonante", e.target.textContent)}); 
        /* e.target apunta al botón exacto sobre el cual se inició el arrastre, permite leer la consonante sin un clic previo*/

        ficha.addEventListener("click", function(){consonanteActiva = consonantes[i]; actualizarFichas();});
        contenedor.append(ficha);
    }
}


//===============================
// RESALTAR FICHAS
//===============================
function actualizarFichas() {
    let fichas = document.querySelectorAll("#fichas button");
    
    for(let i = 0; i < fichas.length; i++){
        fichas[i].classList.remove("btn-primary");
        fichas[i].classList.add("btn-outline-primary");

        if(fichas[i].textContent === consonanteActiva){
            fichas[i].classList.remove("btn-outline-primary");
            fichas[i].classList.add("btn-primary");
        }
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
// COLOCAR EMISION (sílaba)
// ========================
function colocarEmision(posicion, col, boton, indiceGlobal, consonanteArrastrada) { 
    if (tablero[indiceGlobal] !== null) { 
        alert("Casilla ocupada"); 
        return; 
    }

    let indiceColumna = col; // indice del 0 al 11
    
    let letraConsonante = consonanteArrastrada || consonanteActiva; // Si viene del Drag&Drop usa consonanteManual; si no, usa el input global
        // Si en mobile responsive no se seleccionó ninguna consonante antes de tocar la casilla 
        if (!letraConsonante) { 
            alert("Seleccioná una consonante primero."); 
            return; 
        }
    let silaba = letraConsonante + vocales[indiceGlobal % 12];
    let emision = { 
        silaba: silaba, 
        sonidoSimbolo: sonidos[indiceColumna],
        sonidoFrecuencia: frecuencias[indiceColumna], 
        color: null, 
        posicion: posicion 
    };

    emitirSonido(emision.sonidoFrecuencia); // llama a la función para emitir la frecuencia correspondiente a ese sonido

    tablero[indiceGlobal] = emision; 
    signoActual.push(emision); 
    nodosObra.push(emision.posicion); 
    
    crearConexion(); 
    crearRuedaConstelar(); 
    
    boton.textContent = silaba; 
    boton.classList.remove("btn-outline-secondary"); 
    boton.classList.add("btn-outline-warning"); 

    mostrarSignoActual(); 
}


// ============================
// SONIDO librería nativa HTML
// ============================
function emitirSonido(sonidoFrecuencia, duracion = 0.9) { 
    if (!sonidoFrecuencia) 
        return; // Asegurar que el contexto esté activo (requisito navegador) 
    
    if (audioCtx.state === "suspended") { 
    audioCtx.resume(); 
    } 

    let osc = audioCtx.createOscillator(); 
    let gain = audioCtx.createGain(); // Timbre ("triangle") 
    osc.type = "triangle"; 
    osc.frequency.value = sonidoFrecuencia; // frecuencia mapeada con el array "sonidos=[]"

    let ahora = audioCtx.currentTime; // Marca de tiempo actual del reloj de audio

// ENVOLVENTE DE VOLUMEN (ATTACK / DECAY):
    let attackTime = 0.3; // Duración de la fase de ataque (en segundos) 
    gain.gain.setValueAtTime(0, ahora); // Punto de partida: volumen 0 en 'ahora' 
    gain.gain.linearRampToValueAtTime(0.5, ahora + attackTime); // ATTACK: sube el volumen a 0.5 (durante 0.3sec sube hasta 0.5amp)
    gain.gain.exponentialRampToValueAtTime(0.0001, ahora + attackTime + duracion); // DECAY: cae progresivamente a 0 (luego de 0.3sec cae a 0 durante 0.9sec) 

    osc.connect(gain); 
    gain.connect(audioCtx.destination); // Inicio y detención programados 
    osc.start(ahora); 
    osc.stop(ahora + attackTime + duracion); 
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
// CONEXIONES
// ========================
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

    columnaPoema.append(poema);

    header.remove();
    panel.remove();
    footer.remove();
    
    contenedorRueda.style.display = "block";
    btnRecrear.style.display = "block";

    reproducirMelodiaObra();
}


// =====================================
// REPRODUCIR MELODÍA CONSTELACIÓN
// =====================================
function reproducirMelodiaObra() { 
    if (reproductorInterval) clearInterval(reproductorInterval); // si hay sonidos previso se detiene el reproductor
    
// fuerza el inicio del motor de sonido
    if (audioCtx.state === "suspended") { 
        audioCtx.resume(); 
    }

// Recopila todas las emisiones de todos los signos en un array local 
    let listaEmisiones = []; 
    
    for (let i = 0; i < obra.length; i++) { 
        for (let j = 0; j < obra[i].length; j++) { 
        listaEmisiones.push(obra[i][j]); 
        } 
    }  

    if (listaEmisiones.length === 0) return; // Si no se creó ninguna emisión, salimos 
    
    let indice = 0; 

// Inicia temporizador (cada 900 milisegundos = 0.9s x nota) 
    let reproductor = setInterval(function () { 
        // Cuando termina de recorrer la longitud del array listaEmisiones detiene el temporizador 
        if (indice >= listaEmisiones.length) { 
            clearInterval(reproductor); 
            return; 
        } 

// 3\. Tomamos la emisión actual y hacemos sonar su frecuencia 
        let emisionActual = listaEmisiones[indice]; 

        emitirSonido(emisionActual.sonidoFrecuencia, 0.6); // 0.6s de duración para que resuene bien 
        
        indice++; 
        }, 500); // Ritmo de la melodía (500 ms entre nota y nota) 
}


// ========================
// EVENTOS
// ========================
btnCrearCosmos.addEventListener("click", function() { 
    reglas.classList.add("d-none"); 
    interfaz.classList.remove("d-none"); 
    interfaz.classList.add("d-block"); 
});

btnCerrar.addEventListener("click", cerrarSigno);
btnRevelar.addEventListener("click", revelarObra);
btnRecrear.addEventListener("click", function() {
    // si hay sonidos previos los detiene
    if (reproductorInterval) { 
        clearInterval(reproductorInterval); 
        reproductorInterval = null; 
    }
    
    location.reload()
});


// ========================
// INICIO
// ========================
crearTablero();
crearEjes();
crearFichas();
actualizarFichas();
crearRuedaConstelar();
mostrarSignoActual();
mostrarObra();
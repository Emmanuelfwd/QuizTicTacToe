/* obtener elementos del DOM */
let mensaje = document.getElementById("mensajeJuego");
let btnReset = document.getElementById("btnReiniciar");
let btnFondo = document.getElementById("btnSiguienteFondo");
let btnFondoAnterior = document.getElementById("btnFondoPrevio");
let btnMarcadorReset = document.getElementById("btnResetPuntuacion");
let casillas = Array.from(document.getElementsByClassName("casilla"));

/* imagenes de jugadores */
let jugador1 = "src/images/1.png"; /* humano */
let jugador2 = "src/images/o.png"; /* IA */
let currentPlayer = jugador1;

/* estado del juego */
let posicion = Array(9).fill(null);
let turnos = 0;
let juegoTerminado = false;

/* victorias */
let victoriasJugador = parseInt(localStorage.getItem("victoriasJugador")) || 0;
let victoriasAI = parseInt(localStorage.getItem("victoriasAI")) || 0;

/* inicializar marcador */
actualizarMarcador();

/* empezar el juego */
const comenzar = () => {
    casillas.forEach(casilla => casilla.addEventListener('click', rellenada));
}

/* funcion para rellenar casillas */
function rellenada(e){
    let id = parseInt(e.target.id.replace("casilla",""));

    if(juegoTerminado || posicion[id]) return;

    posicion[id] = currentPlayer;

    let ficha = document.createElement("img");
    ficha.src = currentPlayer;
    ficha.alt = "ficha";
    ficha.classList.add("ficha");
    e.target.appendChild(ficha);

    let cuadrosQueGanaron = resultadoJuego();

    if(cuadrosQueGanaron !== false){
        let ganador = currentPlayer === jugador1 ? "1" : "2";

        if(ganador === "1"){
            mensaje.textContent = "¡Jugador gana!";
            victoriasJugador++;
            localStorage.setItem("victoriasJugador", victoriasJugador);

            casillas.forEach(casilla => {
                const imagen = casilla.children[0];
                if(imagen && imagen.src.includes("o.png")){
                    imagen.src ="src/images/22.gif";
                } else if(imagen && imagen.src.includes("1.png")){
                    imagen.src ="src/images/11.gif";
                }
            });

        } else {
            mensaje.textContent = "¡AI gana!";
            victoriasAI++;
            localStorage.setItem("victoriasAI", victoriasAI);

            casillas.forEach(casilla => {
                const imagen = casilla.children[0];
                if(imagen && imagen.src.includes("o.png")){
                    imagen.src ="src/images/33.gif";
                } else if(imagen && imagen.src.includes("1.png")){
                    imagen.src ="src/images/44.gif";
                }
            });
        }

        juegoTerminado = true;
        actualizarMarcador();
        return;
    }

    if(turnos > 8){
        mensaje.textContent = "¡Empate!";
        juegoTerminado = true;
        actualizarMarcador();
        return;
    }

    /* cambiar turno */
    currentPlayer = currentPlayer === jugador1 ? jugador2 : jugador1;

    /* si es IA, hacer movida */
    if(currentPlayer === jugador2 && !juegoTerminado){
        setTimeout(function(){
            /* buscamos casillas vacias */
            let vacias = posicion.map(function(v,i){ if(v === null) return i; else return null; }).filter(function(v){ return v !== null; });
            if(vacias.length > 0){
                /* elegimos una al azar */
                let eleccion = vacias[Math.floor(Math.random() * vacias.length)];
                /* simulamos click para reutilizar logica */
                casillas[eleccion].click();
            }
        },300);
    }
}

/* boton reiniciar juego */
btnReset.addEventListener('click', function(){
    posicion.fill(null);
    casillas.forEach(function(c){ c.innerHTML = ''; });
    mensaje.textContent = "¡A Jugar!";
    currentPlayer = jugador1;
    turnos = 0;
    juegoTerminado = false;
});

/* posibles resultados de victoria */
const posiblesResultadosVictoria = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

/* funcion para verificar si hay ganador */
function resultadoJuego(){
    for(let i = 0; i < posiblesResultadosVictoria.length; i++){
        let condition = posiblesResultadosVictoria[i];
        let a = condition[0];
        let b = condition[1];
        let c = condition[2];

        if(posicion[a] && (posicion[a] === posicion[b] && posicion[a] === posicion[c])){
            turnos = 0;
            return [a,b,c];
        }
    }
    turnos++;
    return false;
}

/* fondos del juego */
const imagenes = [
    "url('src/images/fondo1.webp')",
    "url('src/images/fondo2.jpg')",
    "url('src/images/fondo3.webp')",
    "url('src/images/fondo4.jpg')"
];
let turnoImagen = 0;

btnFondo.addEventListener('click', function(){
    document.body.style.backgroundImage = imagenes[turnoImagen];
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    turnoImagen = (turnoImagen + 1) % imagenes.length;
});

btnFondoAnterior.addEventListener('click', function(){
    turnoImagen = (turnoImagen - 1 + imagenes.length) % imagenes.length;
    document.body.style.backgroundImage = imagenes[turnoImagen];
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
});

/* actualizar marcador */
function actualizarMarcador(){
    if(!mensaje) return; /* previene error si no existe el h1 */
    let marcador = document.getElementById("marcador");
    if(!marcador){
        marcador = document.createElement('div');
        marcador.id = "marcador";
        if(mensaje.parentNode){
            mensaje.parentNode.insertBefore(marcador, mensaje.nextSibling);
        } else {
            document.body.appendChild(marcador); /* fallback */
        }
    }
    marcador.textContent = "Jugador: " + victoriasJugador + " victorias | AI: " + victoriasAI + " victorias";
}

/* boton reset puntuacion */
btnMarcadorReset.addEventListener("click", function(){
    localStorage.removeItem("victoriasJugador");
    localStorage.removeItem("victoriasAI");
    victoriasJugador = 0;
    victoriasAI = 0;
    actualizarMarcador();
});

/* iniciar juego */
comenzar();
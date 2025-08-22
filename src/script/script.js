let text = document.getElementById("enunciado");
let btnReset = document.getElementById("btnRestart");
let btnFondo = document.getElementById("btnFondo")
let btnFondoAnterior = document.getElementById("btnFondoAnterior");
let btnmarcadorRst = document.getElementById("btnReiniciarContadores")
let boxes = Array.from(document.getElementsByClassName("box"));



let jugador1 = "src/images/1.png";
let jugador2 = "src/images/o.png";
let currentPlayer = jugador1;
let posicion = Array(9).fill(null);
let turnos = 0;
let juegoTerminado = false;

let victoriasJ1 = parseInt(localStorage.getItem("victoriasJ1")) || 0;
let victoriasJ2 = parseInt(localStorage.getItem("victoriasJ2")) || 0;

actualizarMarcador()

const comenzar = () => {
    boxes.forEach(box => box.addEventListener('click', rellenada));
}

function rellenada(e) {
    const id = e.target.id;

    if (juegoTerminado || posicion[id]) return;

    posicion[id] = currentPlayer;

    let ficha = document.createElement("img");
    ficha.src = currentPlayer;
    ficha.alt = "jugador";
    ficha.classList.add("ficha");
    e.target.appendChild(ficha);

    let cuadrosQueGanaron = resultadoJuego();

    if (cuadrosQueGanaron !== false) {
        let ganador = currentPlayer === jugador1 ? "1" : "2";
        text.textContent = "El jugador " + ganador + " ha ganado";
        juegoTerminado = true;

        if (ganador === "1") {
            victoriasJ1++;
            localStorage.setItem("victoriasJ1", victoriasJ1);

            boxes.forEach(box => {
            const imagen = box.children[0]
            if(imagen && imagen.src.includes("src/images/o.png")){
                    imagen.src ="src/images/22.gif";
                }
            else{
                    if(imagen && imagen.src.includes("src/images/1.png")){
                        imagen.src ="src/images/11.gif";
                    }
                }
            })   
                              
        } else {

            victoriasJ2++;
            localStorage.setItem("victoriasJ2", victoriasJ2);
            
           boxes.forEach(box => {

                const imagen = box.children[0]
                if(imagen && imagen.src.includes("src/images/o.png")){
                        imagen.src ="src/images/33.gif";
                    }
                else{
                    if(imagen && imagen.src.includes("src/images/1.png")){
                        imagen.src ="src/images/44.gif";
                    }
                }

           })
        }

        actualizarMarcador();
        return;
    }

    if (turnos > 8) {
        text.textContent = "¡Empate!";
        juegoTerminado = true;
        actualizarMarcador();
        return;
    }

    
    currentPlayer = currentPlayer === jugador1 ? jugador2 : jugador1;
}

btnReset.addEventListener('click', function() {
    function resetear() {
        posicion.fill(null);
        boxes.forEach(box => {
            box.innerHTML = '';
            box.style.backgroundColor = '';
        });
        text.textContent = "Tic Tac Toe";
        currentPlayer = jugador1;
        turnos = 0;
        juegoTerminado = false; 
    }
    resetear();
});

const posiblesResultadosVictoria = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function resultadoJuego() {
    for(let i = 0; i < posiblesResultadosVictoria.length; i++) {
        let condition = posiblesResultadosVictoria[i];
        let a = condition[0];
        let b = condition[1];
        let c = condition[2];

        if(posicion[a] && (posicion[a] == posicion[b] && posicion[a] == posicion[c])) {
            turnos = 0;
            return [a, b, c];
            
        }
    }
    turnos++
    return false;
}

comenzar();

const imagenes = [
    "url('src/images/fondo1.webp')",
    "url('src/images/fondo2.jpg')",
    "url('src/images/fondo3.webp')",
    "url('src/images/fondo4.jpg')"
];

let turnoImagen = 0;


btnFondo.addEventListener('click', function () {
    document.body.style.backgroundImage = imagenes[turnoImagen];
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "adjust";

    turnoImagen = (turnoImagen + 1) % imagenes.length;
});

btnFondoAnterior.addEventListener('click', function () {
    turnoImagen = (turnoImagen - 1 + imagenes.length) % imagenes.length;

    document.body.style.backgroundImage = imagenes[turnoImagen];
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
});

/* cosas extra */
function actualizarMarcador(){
    let marcador = document.getElementById("marcador");
    if(!marcador){
        marcador = document.createElement('div');
        marcador.id = "marcador";

        text.parentNode.insertBefore(marcador, text.nextSibling);
    }

    marcador.textContent = `Jugador1: ${victoriasJ1} victorias | Jugador2: ${victoriasJ2} victorias`; 
}

document.getElementById("btnReiniciarContadores").addEventListener("click", () => {
    localStorage.removeItem("victoriasJ1");
    localStorage.removeItem("victoriasJ2");
    victoriasJ1 = 0;
    victoriasJ2 = 0;
    actualizarMarcador();
});
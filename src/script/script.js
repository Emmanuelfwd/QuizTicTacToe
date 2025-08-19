let text = document.getElementById("enunciado");
let btnReset = document.getElementById("btnRestart");
let btnFondo = document.getElementById("btnFondo")
let btnbtnFondoAnterior = document.getElementById("btnFondoAnterior");
let boxes = Array.from(document.getElementsByClassName("box"));



let jugador1 = "src/images/1.png";
let jugador2 = "src/images/o.png";
let currentPlayer = jugador1;
let posicion = Array(9).fill(null);
let turnos = 0;

const comenzar = () => {
    boxes.forEach(box => box.addEventListener('click', rellenada));
    boxes.forEach(box => box.addEventListener('click', rellenada));
}

function rellenada(e) {
    const id = e.target.id;
    
    

    if (!posicion[id]) {
        posicion[id] = currentPlayer;

        /* etiqueta <img> para rellenar con la imagen*/
        let ficha = document.createElement("img");
        ficha.src = currentPlayer;
        ficha.alt = "jugador";
        ficha.classList.add("ficha");

        /* Insertar la imagen en la casilla */
        e.target.appendChild(ficha);

        /* Verificar resultado del juego */
        let cuadrosQueGanaron = resultadoJuego();
        if(cuadrosQueGanaron !== false) {
            text.textContent = "El jugador " + (currentPlayer === jugador1 ? "1" : "2") + " ha ganado";
            turnos = 0;
        }
        else if(turnos > 8){
            text.textContent = "Empate!"
            turnos = 0;
        }

        /* Cambiar turno */
        currentPlayer = currentPlayer === jugador1 ? jugador2 : jugador1;
        
        
        console.log(turnos);
        
    }
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
    "url('src/images/fondo1.jpg')",
    "url('src/images/fondo2.jpg')",
    "url('src/images/fondo3.webp')",
    "url('src/images/fondo4.jpg')"
];

let turnoImagen = 0;


btnFondo.addEventListener('click', function () {
    document.body.style.backgroundImage = imagenes[turnoImagen];
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

    turnoImagen = (turnoImagen + 1) % imagenes.length;
});

btnFondoAnterior.addEventListener('click', function () {
    turnoImagen = (turnoImagen - 1 + imagenes.length) % imagenes.length;

    document.body.style.backgroundImage = imagenes[turnoImagen];
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
});

/* test */
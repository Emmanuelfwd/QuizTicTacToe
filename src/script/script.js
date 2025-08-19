let text = document.getElementById("enunciado");
let btnReset = document.getElementById("btnRestart");
let boxes = Array.from(document.getElementsByClassName("box"));


let jugador1 = "src/images/1.jpg";
let jugador2 = "src/images/o.jpg";
let currentPlayer = jugador1;
let posicion = Array(9).fill(null);

const comenzar = () => {
    boxes.forEach(box => box.addEventListener('click', rellenada));
}

function rellenada(e) {
    const id = e.target.id;

    if (!posicion[id]) {
        posicion[id] = currentPlayer;

        /* Crear una etiqueta <img> con JS para rellenar con la imagen que teremos poner */
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
        }

        /* Cambiar turno */
        currentPlayer = currentPlayer === jugador1 ? jugador2 : jugador1;
    }
}

btnReset.addEventListener('click', function() {
    function resetear() {
        posicion.fill(null);
        boxes.forEach(box => {
            box.innerHTML = ''; // elimina las imágenes
            box.style.backgroundColor = ''; // reinicia color si había victoria
        });
        text.textContent = "Tic Tac Toe";
        currentPlayer = jugador1;
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
            return [a, b, c];
        }
    }
    return false;
}

comenzar();
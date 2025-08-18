let text = document.getElementById("enunciado");
let btnReset = document.getElementById("btnRestart");
let boxes = Array.from( document.getElementsByClassName("box"));

let jugador1 = "X";
let jugador2 = "O";
let currentPlayer = jugador1;
let posicion = Array(9).fill(null);

const comenzar = () => {
    boxes.forEach(box => box.addEventListener('click',rellenada))
}

function rellenada(e) {
    console.log(e.target);
}

comenzar(); 
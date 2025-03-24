document.addEventListener("DOMContentLoaded", () => {
    loadPuzzle();
});

// 2 -> black
const puzzles = {
    "puzzle3": {
        gridSize: 8,
        fix: [2, 2, 0, 0, 2, 0, 2, 0,
            0, 0, 1, 0, 2, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 2, 0,
            0, 0, 2, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 1, 1, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1
        ], // 8x8 griglia
        solution: [2, 2, 1, 1, 2, 1, 2, 1,
            2, 2, 1, 1, 2, 2, 1, 1,
            1, 1, 2, 2, 1, 1, 2, 2,
            1, 1, 2, 1, 2, 2, 1, 2,
            2, 2, 1, 2, 1, 1, 2, 1,
            1, 2, 2, 1, 1, 2, 1, 2,
            2, 1, 1, 2, 2, 1, 1, 2,
            1, 1, 2, 2, 1, 2, 2, 1,
        ],
        word: "1piu",
    },
    "puzzle2": {
        gridSize: 6,
        fix: [0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 1, 0,
            0, 2, 0, 2, 0, 0,
            0, 2, 0, 0, 0, 2,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0],
        solution: [2, 1, 2, 1, 1, 2,
            2, 1, 1, 2, 1, 2,
            1, 2, 1, 2, 2, 1,
            1, 2, 2, 1, 1, 2,
            2, 1, 1, 2, 2, 1,
            1, 2, 2, 1, 2, 1],
        word: "2rtg",
    },
    "puzzle1": {
        gridSize: 6,
        fix: [0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 1, 0,
            0, 2, 0, 0, 0, 2,
            0, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 0, 1,
            0, 2, 0, 2, 0, 2],
        solution: [2, 1, 2, 1, 2, 1,
            2, 1, 1, 2, 1, 2,
            1, 2, 2, 1, 1, 2,
            2, 1, 1, 2, 2, 1,
            1, 2, 2, 1, 2, 1,
            1, 2, 1, 2, 1, 2],
        word: "3ty2",
    },
    "puzzle4": {
        gridSize: 10,
        fix: [2, 2, 0, 0, 0, 0, 0, 2, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 2, 1, 0, 0, 1, 0, 2, 2, 0,
            0, 0, 0, 2, 2, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 2, 0, 0, 0, 0, 0, 0, 2, 0,
            0, 2, 0, 2, 2, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 2, 0, 0, 2, 2, 0,
            0, 0, 0, 0, 0, 0, 2, 0, 2, 0,
            0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        solution: [2, 2, 1, 2, 1, 2, 1, 2, 1, 1,
            2, 1, 2, 1, 1, 2, 2, 1, 1, 2,
            1, 2, 1, 2, 2, 1, 1, 2, 2, 1,
            2, 1, 1, 2, 2, 1, 2, 1, 1, 2,
            2, 1, 2, 1, 1, 2, 1, 2, 2, 1,
            1, 2, 2, 1, 1, 2, 1, 1, 2, 2,
            1, 2, 1, 2, 2, 1, 2, 1, 1, 2,
            2, 1, 1, 2, 2, 1, 1, 2, 2, 1,
            1, 1, 2, 1, 1, 2, 2, 1, 2, 2,
            1, 2, 2, 1, 2, 1, 2, 2, 1, 1],
        word: "igiq",
    },
};

let selectedPuzzle;
let board = [];

function createBoard(puzzle) {
    const gridSize = puzzle.gridSize;
    const fixCells = puzzle.fix;
    const gameBoard = document.getElementById("gameTable");

    gameBoard.innerHTML = "";
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;

    board = new Array(gridSize * gridSize).fill(0); // Inizializza lo stato delle celle



    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;

        let fixedValue = fixCells[i];

        if (fixedValue === 1 || fixedValue === 2) {
            cell.classList.add("fixed"); // Rende la cella non interagibile

            // Creazione del cerchio principale (bianco o nero)
            const circle = document.createElement("div");
            circle.classList.add("circle", fixedValue === 1 ? "white" : "black");

            // Creazione del punto rosso al centro del cerchio
            const centerDot = document.createElement("div");
            centerDot.classList.add("center-dot");

            // Aggiunge il punto rosso dentro il cerchio
            circle.appendChild(centerDot);
            cell.appendChild(circle);

            board[i] = fixedValue;
        } else {
            cell.dataset.state = "0"; // Celle interagibili partono vuote
            cell.addEventListener("click", toggleCell);
        }

        gameBoard.appendChild(cell);
    }

}

// Funzione per alternare lo stato delle celle interagibili
function toggleCell(event) {
    const cell = event.currentTarget;
    let state = parseInt(cell.dataset.state);

    state = (state + 1) % 3; // Alterna tra 0 (vuoto), 1 (cerchio nero), 2 (cerchio bianco)
    cell.dataset.state = state;
    board[cell.dataset.index] = state;

    cell.innerHTML = ""; // Rimuove il contenuto prima di aggiungere il nuovo stato

    if (state === 1) {
        const circle = document.createElement("div");
        circle.classList.add("circle", "white");
        cell.appendChild(circle);
    } else if (state === 2) {
        const circle = document.createElement("div");
        circle.classList.add("circle", "black");
        cell.appendChild(circle);
    }


    debugBoard()
    if (checkWinner()) {
        alert("Complimentazioni, il codice di questo gioco è: " + selectedPuzzle.word)
    }
}
function resetGame() {
    loadPuzzle()
}

function loadPuzzle() {
    const puzzleSelect = document.getElementById("puzzleSelect").value;
    selectedPuzzle = puzzles[puzzleSelect] || puzzles["puzzle1"];
    createBoard(selectedPuzzle);
}

function checkWinner() {
    const gridSize = selectedPuzzle.gridSize;
    for (let index = 0; index < gridSize * gridSize; index++) {
        if (board[index] !== selectedPuzzle.solution[index]) {
            return false;
        }
    }
    return true;
}



function debugBoard() {
    console.log("Board: ", board)
    console.log("Solution: ", selectedPuzzle.solution)
}
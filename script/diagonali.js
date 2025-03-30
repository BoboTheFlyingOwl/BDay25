document.addEventListener("DOMContentLoaded", () => {
    loadPuzzle();
});

// 1 -> /
const puzzles = {
    "puzzle1": {
        gridSize: 6,
        board: [
            [null, 0, null, 1, null, null],
            [null, null, 3, null, null, null],
            [2, null, 2, null, 3, null],
            [null, null, null, 3, null, 2],
            [0, null, null, null, 2, null],
            [null, null, 0, 1, null, 0]
        ],
        solution: [
            [2, 1, 1, 1, 1],
            [1, 1, 2, 2, 1],
            [2, 1, 2, 2, 2],
            [2, 1, 1, 2, 1],
            [1, 1, 2, 2, 1],
        ],
        word: "mr6h",
    },
    "puzzle2": {
        gridSize: 6,
        board: [
            [null, 0, null, null, null, null],
            [null, 3, 2, null, null, 2],
            [2, null, null, null, 3, 1],
            [null, null, 4, null, null, null],
            [null, 3, null, 1, null, 2],
            [null, null, null, 2, null, null]
        ],
        solution: [
            [2, 1, 1, 2, 2],
            [1, 1, 1, 2, 1],
            [2, 2, 1, 1, 1],
            [1, 1, 2, 2, 2],
            [1, 2, 2, 1, 1],
        ],
        word: "sugi",
    },
    "puzzle3": {
        gridSize: 6,
        board: [
            [null, 0, 1, null, null, 0],
            [null, null, null, null, 2, null],
            [null, 3, null, null, 2, 2],
            [2, 2, null, 2, 2, 1],
            [null, null, 2, null, null, null],
            [null, 2, null, 0, null, 1]
        ],
        solution: [
            [2, 1, 1, 2, 2],
            [2, 1, 2, 2, 2],
            [1, 1, 2, 1, 1],
            [2, 2, 2, 1, 1],
            [2, 1, 1, 2, 2],

        ],
        word: "nuna",
    },
    "puzzle4": {
        gridSize: 6,
        board: [
            [null, null, null, 1, 0, null],
            [0, null, 3, null, 3, 0],
            [null, null, null, 3, 2, null],
            [null, 2, null, null, null, null],
            [null, 2, 4, 2, null, 1],
            [null, null, null, 1, null, null],
        ],
        solution: [
            [2, 2, 2, 2, 1],
            [1, 1, 2, 2, 2],
            [1, 1, 1, 2, 2],
            [2, 2, 1, 1, 2],
            [1, 1, 2, 2, 2],
        ],
        word: "iyvn"
    },

};

let board = []; // Array per tracciare lo stato delle celle

function createBoard(puzzle) {
    const gridSize = puzzle.gridSize;
    board = new Array(gridSize * gridSize).fill(0); // Inizializza lo stato delle celle
    const gameBoard = document.getElementById("gameTable");
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 80px)`;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("div");
            const index = row * gridSize + col;



            // Ultima colonna o ultima riga: solo numero
            if (row === gridSize - 1 || col === gridSize - 1) {
                cell.classList.add("cell-hidden"); // Classe speciale per il CSS
                cell.dataset.index = index;
                cell.dataset.state = "0";
            } else {
                cell.classList.add("cell");
                cell.dataset.index = index;
                cell.dataset.state = "0";
                cell.addEventListener("click", toggleDiagonal);
            }

            // Se c'è un numero, lo aggiungiamo
            if (puzzle.board[row][col] !== null) {


                const number = document.createElement("div");
                number.classList.add("number");
                number.textContent = puzzle.board[row][col];
                cell.appendChild(number);
            }


            gameBoard.appendChild(cell);
        }
    }
}


function toggleDiagonal(event) {
    const cell = event.currentTarget;
    const index = parseInt(cell.dataset.index);
    let state = parseInt(cell.dataset.state);
    state = (state + 1) % 3;
    cell.dataset.state = state;
    board[index] = state; // Aggiorna lo stato della cella nell'array


    cell.classList.remove("diagonal1", "diagonal2");
    if (state === 1) {
        cell.classList.add("diagonal1");
    } else if (state === 2) {
        cell.classList.add("diagonal2");
    }


    if (checkWinner()) {
        alert("Complimentazioni, il codice di questo gioco è: " + selectedPuzzle.word)
    }
}

let selectedPuzzle;

function loadPuzzle() {
    const puzzleSelect = document.getElementById("puzzleSelect").value;
    selectedPuzzle = puzzles[puzzleSelect] || puzzles["puzzle1"];
    createBoard(selectedPuzzle);
}

function resetGame() {
    loadPuzzle();
}

function debugboard() {
    console.log("board: ", board)
    console.log("Solution: ", selectedPuzzle.solution)
}

function checkWinner() {
    if (!selectedPuzzle.solution) {
        console.error("Nessuna soluzione definita per questo puzzle.");
        return false;
    }

    const gridSize = selectedPuzzle.gridSize;

    for (let row = 0; row < gridSize - 1; row++) {
        for (let col = 0; col < gridSize - 1; col++) {
            let boardValue = board[row * gridSize + col];  // Ricostruisce l'indice corretto
            let solutionValue = selectedPuzzle.solution[row][col];

            if (boardValue != solutionValue) {
                return false;
            }
        }
    }

    return true;
}


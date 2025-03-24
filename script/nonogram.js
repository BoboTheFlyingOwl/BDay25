document.addEventListener("DOMContentLoaded", () => {
    loadPuzzle();
});

const puzzles = {
    "puzzle1": {
        gridSize: 5,
        verticalNumbers: [
            [2],
            [1],
            [4],
            [2],
            [2, 2],

        ],
        orizzontalNumbers: [
            [2],
            [3],
            [1],
            [1, 1, 1],
            [3, 1],
        ],
        solution: [
            [0, 0, 0, 1, 1],
            [0, 0, 1, 1, 1],
            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1],

        ],
        word: "elgh",
    },
    "puzzle2": {
        gridSize: 5,
        verticalNumbers: [
            [2],
            [3],
            [2],
            [1, 2],
            [1, 2],

        ],
        orizzontalNumbers: [
            [3, 1],
            [4],
            [1],
            [2],
            [2],
        ],
        solution: [
            [1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1]

        ],
        word: "au3z"
    },
    "puzzle3": {
        gridSize: 5,
        verticalNumbers: [
            [3],
            [3, 1],
            [1, 3],
            [1],
            [1],

        ],
        orizzontalNumbers: [
            [3],
            [2],
            [3],
            [1],
            [4],
        ],
        solution: [
            [1, 1, 1, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 1],

        ],
        word: "7ujk"
    },
    "puzzle4": {
        gridSize: 10,
        verticalNumbers: [
            [1, 1],
            [2],
            [4],
            [3, 3],
            [8],
            [1, 7],
            [6],
            [4, 1],
            [4, 1],
            [2, 2],

        ],
        orizzontalNumbers: [
            [1, 5],
            [4, 4],
            [4, 3],
            [7],
            [3],
            [1, 3],
            [3],
            [3],
            [3, 1],
            [1, 1, 3]
        ],
        solution: [
            [0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 1, 1],

        ],
        word: "aitz"
    }

}

let board = [];


function createBoard(puzzle) {
    const gridSize = puzzle.gridSize;
    const gameBoard = document.getElementById("gameTable");
    gameBoard.innerHTML = "";
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize + 1}, 50px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize + 1}, 50px)`;

    board = new Array(gridSize * gridSize).fill(0); // Inizializza lo stato delle celle

    for (let row = 0; row <= gridSize; row++) {
        for (let col = 0; col <= gridSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (row === 0 && col > 0) {
                // Numeri sopra le colonne (verticali)
                if (puzzle.verticalNumbers[col - 1] && puzzle.verticalNumbers[col - 1].length) {
                    cell.textContent = puzzle.verticalNumbers[col - 1].join("\n");
                    cell.classList.add("hint");
                }
            } else if (col === 0 && row > 0) {
                // Numeri a sinistra delle righe (orizzontali)
                if (puzzle.orizzontalNumbers[row - 1] && puzzle.orizzontalNumbers[row - 1].length) {
                    cell.textContent = puzzle.orizzontalNumbers[row - 1].join("\n");
                    cell.classList.add("hint");
                }
            } else if (row > 0 && col > 0) {
                // Celle di gioco cliccabili
                const index = (row - 1) * gridSize + (col - 1);
                cell.dataset.index = index;
                cell.dataset.state = "0";
                cell.addEventListener("click", toggleCell);
            } else {
                // Angolo in alto a sinistra (vuoto)
                cell.classList.add("empty");
            }

            gameBoard.appendChild(cell);
        }
    }
}

// Funzione per alternare lo stato delle celle
function toggleCell(event) {
    const cell = event.currentTarget;
    const index = parseInt(cell.dataset.index);
    let state = parseInt(cell.dataset.state);

    state = (state + 1) % 2; // Alterna tra 0 e 1
    cell.dataset.state = state;
    board[index] = state;

    cell.classList.toggle("filled", state === 1);

    if (checkWinner()) {
        alert("Complimentazioni, il codice di questo gioco è: " + selectedPuzzle.word)
    }
}

function loadPuzzle() {
    const puzzleSelect = document.getElementById("puzzleSelect").value;
    selectedPuzzle = puzzles[puzzleSelect] || puzzles["puzzle1"];
    createBoard(selectedPuzzle);
}

function resetGame() {
    loadPuzzle()
}


function checkWinner() {
    const gridSize = selectedPuzzle.gridSize;
    const solution = selectedPuzzle.solution;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const index = row * gridSize + col;
            if (board[index] !== solution[row][col]) {
                return false;
            }
        }
    }

    return true;
}

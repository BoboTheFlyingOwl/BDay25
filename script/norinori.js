document.addEventListener("DOMContentLoaded", () => {
    loadPuzzle(); // Carica il puzzle predefinito all'avvio
});

let gridSize;
let board;
let boardValue;
let selectedPuzzle;

const puzzles = {

    "puzzle1": {
        gridSize: 6,
        norinoriBorders: {
            vertical: [
                0, 1, 1, 0, 0, 1,
                0, 1, 1, 0, 0, 1,
                0, 1, 1, 0, 0, 1,
                0, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 1,
                0, 0, 0, 1, 0, 0
            ],
            horizontal: [
                0, 0, 0, 0, 0, 0,
                0, 0, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 1,
                0, 1, 1, 1, 1, 0,
                1, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 1
            ]
        },
        solution: [
            0, 0, 1, 1, 0, 1,
            0, 1, 0, 0, 0, 1,
            0, 1, 0, 1, 1, 0,
            1, 0, 1, 0, 0, 1,
            1, 0, 1, 0, 0, 1,
            0, 0, 0, 1, 1, 0
        ],
        word: "4iur",
    },
    "puzzle2": {
        gridSize: 6,
        norinoriBorders: {
            vertical: [
                0, 0, 0, 0, 1, 1,
                0, 1, 1, 0, 1, 1,
                0, 1, 1, 0, 1, 1,
                0, 1, 1, 0, 1, 1,
                0, 1, 0, 1, 1, 1,
                0, 1, 0, 0, 0, 0
            ],
            horizontal: [
                0, 0, 0, 0, 0, 0,
                1, 0, 1, 1, 0, 0,
                0, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 1, 0,
                0, 0, 0, 1, 0, 1,

            ]
        },
        solution: [
            1, 1, 0, 0, 1, 1,
            0, 0, 1, 1, 0, 0,
            0, 1, 0, 0, 1, 1,
            0, 1, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0,
            1, 0, 0, 0, 1, 1
        ],
        word: "fprt",
    },
    "puzzle3": {
        gridSize: 8,
        norinoriBorders: {
            vertical: [
                0, 0, 1, 0, 0, 0, 1, 1,
                0, 1, 0, 0, 1, 0, 1, 1,
                0, 0, 1, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 0, 0, 1, 0,
                0, 1, 0, 1, 1, 1, 0, 0,
                0, 1, 1, 0, 0, 1, 1, 0,
                0, 1, 1, 0, 0, 1, 1, 0,
                0, 0, 0, 0, 1, 0, 0, 1,
            ],
            horizontal: [
                0, 0, 0, 0, 0, 0, 0, 0,
                1, 0, 1, 1, 0, 0, 0, 0,
                0, 1, 1, 1, 0, 0, 1, 0,
                0, 1, 0, 0, 0, 0, 1, 1,
                0, 0, 1, 0, 1, 1, 0, 0,
                1, 0, 1, 1, 0, 1, 1, 1,
                0, 0, 1, 1, 1, 0, 0, 0,
                1, 1, 0, 0, 1, 1, 1, 0,

            ]
        },
        solution: [
            0, 0, 0, 0, 0, 0, 1, 0,
            1, 0, 1, 1, 0, 0, 1, 0,
            1, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 1, 1, 0,
            0, 1, 0, 1, 1, 0, 0, 1,
            1, 0, 1, 0, 0, 1, 0, 1,
            1, 0, 1, 0, 0, 1, 0, 0,
            0, 0, 0, 1, 1, 0, 1, 1,
        ],
        word: "2u5y",

    },
    "puzzle4": {
        gridSize: 8,
        norinoriBorders: {
            vertical: [
                0, 0, 1, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 1, 1, 1, 1,
                0, 0, 1, 0, 1, 0, 1, 1,
                0, 1, 0, 1, 0, 1, 1, 0,
                0, 0, 0, 1, 1, 0, 1, 0,
                0, 0, 1, 0, 0, 1, 0, 1,
                0, 1, 0, 1, 1, 1, 0, 0,
                0, 1, 0, 1, 1, 1, 0, 0,
            ],
            horizontal: [
                0, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 1, 0, 1,
                1, 1, 0, 0, 1, 0, 0, 0,
                0, 1, 0, 1, 1, 0, 1, 0,
                1, 1, 1, 1, 1, 0, 1, 1,
                0, 0, 1, 0, 1, 1, 1, 0,
                0, 1, 1, 1, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0,
            ]
        },
        solution: [
            1, 1, 0, 1, 0, 0, 0, 1,
            0, 0, 0, 1, 0, 1, 0, 1,
            0, 1, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 1, 0, 1, 0,
            1, 0, 1, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 1, 1, 0, 1,
            0, 1, 0, 1, 0, 0, 0, 1,
            0, 1, 0, 1, 0, 0, 0, 0,
        ],
        word: "8utr",
    },

};

function createBoard() {


    gridSize = selectedPuzzle.gridSize;
    board = new Array(gridSize * gridSize).fill("");
    boardValue = new Array(gridSize * gridSize).fill(0);

    const gameTable = document.getElementById("gameTable");
    gameTable.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    gameTable.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
    gameTable.innerHTML = "";

    let borders = selectedPuzzle.norinoriBorders || { vertical: [], horizontal: [] };

    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        let row = Math.floor(index / gridSize);
        let col = index % gridSize;

        cellDiv.onclick = () => toggleCell(cellDiv, index);

        // Reset bordi per evitare problemi
        cellDiv.style.border = "1px solid black";

        // Controllo per le linee verticali
        if (col < borders.vertical.length && borders.vertical[index] === 1) {
            cellDiv.style.borderLeft = "4px solid black";
        }

        // Controllo per le linee orizzontali
        if (row < borders.horizontal.length && borders.horizontal[index] === 1) {
            cellDiv.style.borderTop = "4px solid black";
        }

        gameTable.appendChild(cellDiv);
    });
}

function toggleCell(cell, index) {
    boardValue[index] = (boardValue[index] + 1) % 3;

    cell.classList.remove("cell", "cellSelected", "cellNotPossible");

    if (boardValue[index] === 0) {
        cell.classList.add("cell");
        cell.innerText = "";
    } else if (boardValue[index] === 1) {
        cell.classList.add("cellSelected");
    } else if (boardValue[index] === 2) {
        cell.classList.add("cellNotPossible");
        cell.innerText = "X";
    }

    if (checkSolution()) {

        alert("Complimentazioni, il codice di questo gioco è: " + selectedPuzzle.word)

    }
}

function checkSolution() {
    if (!selectedPuzzle) return;

    const solution = selectedPuzzle.solution;

    for (let index = 0; index < boardValue.length; index++) {
        if ((solution[index] === 1 && boardValue[index] !== 1) ||
            (solution[index] === 0 && boardValue[index] === 1)) {
            return false;
        }
    }
    return true;

}

function resetGame() {
    if (!selectedPuzzle) return;
    board.fill("");
    boardValue.fill(0);
    createBoard();
}

function loadPuzzle(puzzleName) {
    const puzzleSelect = document.getElementById("puzzleSelect");
    puzzleName = puzzleName || puzzleSelect.value;
    console.log(puzzleName)
    selectedPuzzle = puzzles[puzzleName] || puzzles["puzzle1"];
    createBoard();
}

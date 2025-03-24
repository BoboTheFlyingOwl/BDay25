let gridSize = 3;
let currentPlayer = "X";
let board = [];


const puzzles = {
    "puzzle1": { gridSize: 5, board: new Array(gridSize * gridSize).fill("") },
};

const thickBorders = {
    "vertical": [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
    "horizontal": [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2]
};

const norinoriBorders = {
    "vertical": [1, 1, 0, 0, 1, 0, 1, 0, 0, 1], // 1 = bordo più spesso, 0 = bordo normale
    "horizontal": [1, 0, 1, 0, 0, 1, 0, 1, 0, 0]
};


function createBoard() {
    const gameTable = document.getElementById("gameTable");
    gameTable.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    gameTable.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
    gameTable.innerHTML = "";

    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;

        let row = Math.floor(index / gridSize);
        let col = index % gridSize;

        // Controllo per evitare errori di accesso agli array
        if (col > 0 && norinoriBorders.vertical.length > row * (gridSize - 1) + col - 1) {
            if (norinoriBorders.vertical[row * (gridSize - 1) + col - 1]) {
                cellDiv.style.borderLeftWidth = "4px";
            }
        }
        if (row > 0 && norinoriBorders.horizontal.length > (row - 1) * gridSize + col) {
            if (norinoriBorders.horizontal[(row - 1) * gridSize + col]) {
                cellDiv.style.borderTopWidth = "4px";
            }
        }

        if (!cell) {
            cellDiv.onclick = () => makeMove(index);
            console.log(index);

        }
        gameTable.appendChild(cellDiv);
    });
}



function makeMove(index) {
    if (board[index] === "") {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        createBoard();
        checkWinner();
    }
}

function checkWinner() {
    for (let i = 0; i < gridSize; i++) {
        if (checkLine([...Array(gridSize).keys()].map(j => i * gridSize + j)) ||
            checkLine([...Array(gridSize).keys()].map(j => j * gridSize + i))) {
            return;
        }
    }
    if (checkLine([...Array(gridSize).keys()].map(i => i * gridSize + i)) ||
        checkLine([...Array(gridSize).keys()].map(i => (i + 1) * (gridSize - 1)))) {
        return;
    }
    if (!board.includes("")) {
        alert("Pareggio!");
        resetGame();
    }
}

function checkLine(indices) {
    const first = board[indices[0]];
    if (first && indices.every(i => board[i] === first)) {
        alert(`Giocatore ${first} ha vinto!`);
        resetGame();
        return true;
    }
    return false;
}

function resetGame() {
    board = new Array(gridSize * gridSize).fill("");
    currentPlayer = "X";
    createBoard();
}

function changeGridSize() {
    let newSize = parseInt(prompt("Inserisci la dimensione della griglia (es. 3, 4, 5):", gridSize));
    if (newSize >= 3 && newSize <= 5) {
        gridSize = newSize;
        resetGame();
    } else {
        alert("Inserisci un valore tra 3 e 5.");
    }
}

function loadPuzzle() {
    let selectedPuzzle = document.getElementById("puzzleSelect").value;
    if (puzzles[selectedPuzzle]) {
        gridSize = puzzles[selectedPuzzle].gridSize;
        board = [...puzzles[selectedPuzzle].board];
        createBoard();
    }
}

function generateBorders(gridSize) {
    let vertical = new Array(gridSize * (gridSize - 1)).fill(0);
    let horizontal = new Array((gridSize - 1) * gridSize).fill(0);

    // Imposta alcuni bordi spessi casualmente per test
    for (let i = 0; i < vertical.length; i++) {
        vertical[i] = Math.random() > 0.7 ? 1 : 0;
    }
    for (let i = 0; i < horizontal.length; i++) {
        horizontal[i] = Math.random() > 0.7 ? 1 : 0;
    }

    return { vertical, horizontal };
}

createBoard();
document.addEventListener("DOMContentLoaded", () => {
    loadPuzzle();
});

let difficulties = {
    "easy": {
        dimension: 4,
        colors: ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "brown"],
        tentativi: 10,
        word: "zrvj",
    },
    "normal": {
        dimension: 6,
        colors: ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "brown", "pink", "lime", "black", "white"],
        tentativi: 15,
        word: "3rgh",
    },
    "hard": {
        dimension: 7,
        colors: ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "brown", "pink", "lime", "black", "white", "gold", "silver"],
        tentativi: 30,//20,
        word: "tltz"
    },
    "expert": {
        dimension: 8,
        //colors: ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "brown", "pink", "lime", "black", "white", "gold", "silver", "navy", "maroon", "teal", "beige", "magenta", "olive"],
        colors: ["red", "blue", "green", "yellow", "purple", "orange", "cyan", "brown", "pink", "lime", "black", "white", "gold", "silver", "navy", "maroon"],
        tentativi: 60, //40,
        word: "6uyi"
    }
};


let secretSeq = [];
let currentGuess = [];
let dimension = 4;
let currentLevel = "easy";
let attempts = 0;
let maxAttempts;


function setDifficulty(value) {
    if (difficulties[value]) {
        currentLevel = value;
        dimension = difficulties[value].dimension;

        resetGame();
    }
}

function loadPuzzle(level = "easy") {
    currentLevel = level;
    startGame(level);
}

function resetGame() {
    startGame(currentLevel);
}

function startGame(level) {
    let gameData = difficulties[level];
    dimension = gameData.dimension;
    secretSeq = generateSecretSequence([...gameData.colors], dimension);

    Debug.Log("Segreto: " + secretSeq)
    maxAttempts = difficulties[level].tentativi
    currentGuess = [];
    attempts = 0;
    updateAttemptsDisplay();
    document.getElementById("message").textContent = "";
    renderBoard(gameData.colors);
    //console.log("Sequenza segreta:", secretSeq); // Debug
}

function generateSecretSequence(colors, dimension) {
    let shuffled = colors.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, dimension);
}

function renderBoard(colors) {
    let board = document.getElementById("gameBoard");
    board.innerHTML = "";

    let row = document.createElement("div");
    row.classList.add("row");
    colors.forEach(color => {
        let circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.backgroundColor = color;
        circle.onclick = () => addColorToGuess(color);
        row.appendChild(circle);
    });
    board.appendChild(row);
}

function addColorToGuess(color) {
    //console.log("currentGuess:" + currentGuess)
    //console.log("SecretSeq: " + secretSeq)

    if (currentGuess.indexOf(color) == -1) {
        if (currentGuess.length < dimension) {
            currentGuess.push(color);
            updateGuessDisplay();
            if (currentGuess.length === dimension) {
                checkGuess();
            }
        }
    }
}

function updateGuessDisplay() {
    let board = document.getElementById("gameBoard");
    let inputRow = document.getElementById("currentInputRow");

    if (!inputRow) {
        inputRow = document.createElement("div");
        inputRow.classList.add("row");
        inputRow.id = "currentInputRow";
        board.appendChild(inputRow);
    }

    inputRow.innerHTML = ""; // Pulisce la riga corrente

    currentGuess.forEach(color => {
        let circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.backgroundColor = color;
        inputRow.appendChild(circle);
    });
}

function checkGuess() {
    attempts++;
    updateAttemptsDisplay();

    let board = document.getElementById("gameBoard");
    let guessRow = document.createElement("div");
    guessRow.classList.add("row");

    let feedback = document.createElement("div");
    feedback.classList.add("feedback");

    let exactMatches = 0, colorMatches = 0;
    let tempSecret = [...secretSeq];
    let tempGuess = [...currentGuess];

    for (let i = 0; i < dimension; i++) {
        if (tempGuess[i] === tempSecret[i]) {
            exactMatches++;
            tempSecret[i] = tempGuess[i] = null;
        }
    }

    for (let i = 0; i < dimension; i++) {
        if (tempGuess[i] && tempSecret.includes(tempGuess[i])) {
            colorMatches++;
            tempSecret[tempSecret.indexOf(tempGuess[i])] = null;
        }
    }

    currentGuess.forEach(color => {
        let circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.backgroundColor = color;
        guessRow.appendChild(circle);
    });

    for (let i = 0; i < exactMatches; i++) {
        let peg = document.createElement("div");
        peg.style.backgroundColor = "black";
        feedback.appendChild(peg);
    }
    for (let i = 0; i < colorMatches; i++) {
        let peg = document.createElement("div");
        peg.style.backgroundColor = "white";
        feedback.appendChild(peg);
    }

    guessRow.appendChild(feedback);
    board.appendChild(guessRow);

    document.getElementById("currentInputRow").remove(); // Rimuove la riga di input
    currentGuess = [];

    if (exactMatches === dimension) {
        alert("Complimentazioni, il codice di questo gioco è: " + difficulties[currentLevel].word)
    } else if (attempts >= maxAttempts) {
        document.getElementById("message").textContent = "Hai perso! La sequenza era: " + secretSeq.join(", ");
    }
}

function updateAttemptsDisplay() {
    document.getElementById("attemptsDisplay").textContent = "Tentativi rimasti: " + (maxAttempts - attempts);
}

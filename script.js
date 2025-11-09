// przykładowe hasła (pozycja i kierunek)
const words = [
    { word: "GIT", x: 0, y: 0, direction: "across" },
    { word: "JS", x: 2, y: 1, direction: "down" },
    { word: "NULL", x: 5, y: 2, direction: "across" }
];

const gridSize = 10;
const crossword = document.getElementById("crossword");

// funkcja tworzenia siatki
function createGrid() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const input = document.createElement("input");
            input.maxLength = 1;
            input.dataset.x = x;
            input.dataset.y = y;

            // wczytanie z localStorage
            const saved = localStorage.getItem(`cell-${x}-${y}`);
            if (saved) input.value = saved;

            // zapis przy wpisywaniu
            input.addEventListener("input", e => {
                localStorage.setItem(`cell-${x}-${y}`, e.target.value.toUpperCase());
            });

            crossword.appendChild(input);
        }
    }
}

// sprawdzenie odpowiedzi
function checkWords() {
    words.forEach(w => {
        for (let i = 0; i < w.word.length; i++) {
            let x = w.x + (w.direction === "across" ? i : 0);
            let y = w.y + (w.direction === "down" ? i : 0);
            const input = document.querySelector(`input[data-x="${x}"][data-y="${y}"]`);
            if (input.value.toUpperCase() === w.word[i]) {
                input.style.backgroundColor = "#0f0";
            } else {
                input.style.backgroundColor = "#f00";
            }
        }
    });
}

// reset
function resetGrid() {
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
        input.style.backgroundColor = "#2e2e2e";
        localStorage.removeItem(`cell-${input.dataset.x}-${input.dataset.y}`);
    });
}

document.getElementById("checkBtn").addEventListener("click", checkWords);
document.getElementById("resetBtn").addEventListener("click", resetGrid);

createGrid();
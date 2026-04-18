const wordButtons = document.querySelectorAll(".wordBtn");
const uniqueButtons = document.querySelectorAll(".uniqueBtn");
const rows = document.querySelectorAll(".highscore--score");

let selectedWordFilter = "all";
let selectedUniqueFilter = "all";

function filterHighscores() {
    rows.forEach(row => {
        const wordLength = row.getAttribute("data-wordlength");
        const unique = row.getAttribute("data-unique");

        const matchesWordLength =
            selectedWordFilter === "all" || wordLength === selectedWordFilter;

        const matchesUnique =
            selectedUniqueFilter === "all" || unique === selectedUniqueFilter;

        if (matchesWordLength && matchesUnique) {
            row.classList.remove("hidden");
        } else {
            row.classList.add("hidden");
        }
    });
}

wordButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedWordFilter = button.getAttribute("data-filter");

        wordButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        filterHighscores();
    });
});

uniqueButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedUniqueFilter = button.getAttribute("data-filter");

        uniqueButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        filterHighscores();
    });
});
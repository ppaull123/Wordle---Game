import express from "express"
import { checkGuess } from "./checkGuess.js";
import fs from "fs";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import staticRoutes from "./routes/staticRoutes.js";
import highscoreRoutes from "./routes/highscoreRoutes.js";
import apiHighscoreRoutes from "./routes/apiHighscoreRoutes.js";

mongoose.connect("mongodb://127.0.0.1:27017/wordle")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))


const words = fs.readFileSync("./words_alpha.txt", "utf-8").split("\n").map(e => e.trim())


const app = express()

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: false
}));
app.set("view engine", "hbs");
app.set("views", "./views");

import path from "path";

app.use(express.static(path.resolve("public")));
app.use(express.static(path.resolve("../client/dist")));

const games = [];

app.use(express.json())

app.use((req, res, next) => {
    req.games = games;
    next();
});

app.post("/api/start", (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            error: "Request body is missing"
        });
    }

    const { wordLength, uniqueLetters } = body;

    if (!wordLength) {
        return res.status(400).json({
            error: "wordLength is missing"
        });
    }

    let filterWords = words.filter((word) => word.length === wordLength)

    if (uniqueLetters === true) {
        filterWords = filterWords.filter(word => new Set(word).size === word.length);
    }

    const startTime = Date.now()

    const rand = Math.floor((Math.random() * filterWords.length))
    const secretWord = filterWords[rand]

    const gameID = Date.now().toString();

    const game = {
        gameID,
        wordLength,
        uniqueLetters,
        secretWord,
        guesses: [],
        isFinished: false,
        startTime
    }

    games.push(game);
    console.log("body:", req.body)

    res.json({
        gameID,
        wordLength: game.wordLength,
        uniqueLetters: game.uniqueLetters
    })
})

app.post("/api/guess", (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            error: "Request body is missing"
        });
    }

    const { gameID, guess } = body;

    if (!gameID) {
        return res.status(400).json({
            error: "GameID is missing"
        });
    }

    if (!guess) {
        return res.status(400).json({
            error: "Guess is missing"
        });
    }

    const game = games.find(g => g.gameID === gameID);

    if (!game) {
        return res.status(404).json({
            error: "The game with the provided gameID was not found"
        });
    }

    if (game.isFinished) {
        return res.status(400).json({
            error: "The game is already finished"
        });
    }

    if (guess.length !== game.wordLength) {
        return res.status(400).json({
            error: "Your guess must be " + game.wordLength + " letters long"
        });
    }

    if (!words.includes(guess)) {
        return res.status(400).json({
            error: "Your guess is not a valid word"
        });
    }

    const feedback = checkGuess(guess, game.secretWord);
    const isCorrect = guess.toUpperCase() === game.secretWord.toUpperCase();

    const endTime = Date.now()

    const timePlayed = endTime - game.startTime;

    game.guesses.push({
        guess,
        feedback,
    });

    if (isCorrect) {
        game.isFinished = true;
        game.timePlayed = timePlayed;
        game.isWin = true;
    }

    else if (game.guesses.length >= 6) {
        game.isFinished = true;
        game.timePlayed = timePlayed;
        game.isWin = false;
    }

    res.json({
        gameID,
        secretWord: game.isFinished ? game.secretWord : null,
        guess,
        feedback,
        guesses: game.guesses,
        isFinished: game.isFinished,
        timePlayed: game.isFinished ? timePlayed : null,
        isWin: game.isFinished ? game.isWin : null
    });
});

app.use(apiHighscoreRoutes);

app.use(highscoreRoutes);

app.use(staticRoutes);

app.use((req, res) => {
    res.sendFile(path.resolve("../client/dist/index.html"));
});

app.listen(5080, () => {
    console.log("server körs på http://localhost:5080")
})
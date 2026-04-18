import express from "express";
import Highscore from "../models/Highscore.js";

const router = express.Router();

router.post("/api/highscore", async (req, res) => {
    const { name, gameID } = req.body;

    if (!name || !gameID) {
        return res.status(400).json({
            error: "Name and gameID are required"
        });
    }

    const game = req.games.find(g => g.gameID === gameID);

    if (!game) {
        return res.status(404).json({
            error: "The game with the provided gameID was not found"
        });
    }

    if (!game.isFinished) {
        return res.status(400).json({
            error: "The game is not finished yet"
        });
    }

    if (!game.isWin) {
        return res.status(400).json({
            error: "Only wins can be submitted to the highscore list"
        });
    }

    const highscore = new Highscore({
        name,
        time: game.timePlayed,
        guesses: game.guesses.length,
        wordLength: game.wordLength,
        uniqueLetters: game.uniqueLetters
    });

    try {
        await highscore.save();
        res.json(highscore);
    } catch (error) {
        res.status(500).json({ error: "Failed to save highscore" });
    }
});

export default router;
import express from "express";
import Highscore from "../models/Highscore.js";

const router = express.Router();

router.get("/highscore", async (req, res) => {
    const highscoresFromDb = await Highscore.find()
        .sort({ guesses: 1, time: 1 })
        .lean();

    const highscores = highscoresFromDb.map(score => {
        const totalSeconds = Math.floor(score.time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return {
            ...score,
            formattedTime:
                String(minutes).padStart(2, "0") +
                ":" +
                String(seconds).padStart(2, "0")
        };
    });

    res.render("highscore", { highscores });
});

export default router;
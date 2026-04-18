import express from "express";
import path from "path";

const router = express.Router();

router.get("/about", (req, res) => {
    res.sendFile(path.resolve("public/about.html"));
});

export default router;
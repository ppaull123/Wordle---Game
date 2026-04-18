export async function startGameRequest(wordLength, uniqueLetters) {
    const response = await fetch("/api/start", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wordLength,
            uniqueLetters
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || "Failed to start game")
    }

    return data
}

export async function submitGuessRequest(gameID, guess) {
    const response = await fetch("/api/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gameID,
            guess
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || "Failed to submit guess")
    }

    return data
}

export async function saveHighscoreRequest(name, gameID) {
    const response = await fetch("/api/highscore", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            gameID
        })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || "Failed to save highscore")
    }

    return data
}
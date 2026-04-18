function ResultModal({
    isFinished,
    isWin,
    secretWord,
    newTime,
    guesses,
    name,
    setName,
    saveHighscore,
    saveMessage,
    startGame
}) {
    if (!isFinished) return null

    return isWin ? (
        <div className='result'>
            <h2 className='result--header'>Congratulations!🎉</h2>
            <p className='result--secretWord'>
                The secret word was: <span>{secretWord}</span>
            </p>
            <p className='result--time'>
                Time taken: <span>{newTime}</span>
            </p>
            <p className='result--guesses'>
                Number of guesses: <span>{guesses.length}</span>
            </p>

            <div>
                <input
                    className='result--saveName'
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className='result--saveBtn' onClick={saveHighscore}>
                    Save
                </button>
            </div>

            {saveMessage && (
                <small className='result--saveMessage'>{saveMessage}</small>
            )}

            <button className='result--playBtn' onClick={startGame}>
                Play Again
            </button>
        </div>
    ) : (
        <div className='result'>
            <h2 className='result--header'>Game Over!😥</h2>
            <p className='result--secretWord'>
                The secret word was: <span>{secretWord}</span>
            </p>
            <p className='result--time'>
                Time taken: <span>{newTime}</span>
            </p>
            <button className='result--playBtn' onClick={startGame}>
                Play Again
            </button>
        </div>
    )
}

export default ResultModal
function StartPage({
    wordLength,
    setWordLength,
    uniqueLetters,
    setUniqueLetters,
    startGame
}) {
    return (
        <div className='startpage'>
            <h1 className='startpage--header'>WORDLE</h1>
            <p className='startpage--ptag'>Guess the secret word</p>

            <div className='startpage--settings'>
                <p>Choose word length</p>

                <div className='startpage--wordLength'>
                    <span
                        onClick={() => setWordLength(3)}
                        className={wordLength === 3 ? "active" : ""}
                    >
                        <p>3</p>
                    </span>
                    <span
                        onClick={() => setWordLength(4)}
                        className={wordLength === 4 ? "active" : ""}
                    >
                        <p>4</p>
                    </span>
                    <span
                        onClick={() => setWordLength(5)}
                        className={wordLength === 5 ? "active" : ""}
                    >
                        <p>5</p>
                    </span>
                    <span
                        onClick={() => setWordLength(6)}
                        className={wordLength === 6 ? "active" : ""}
                    >
                        <p>6</p>
                    </span>
                    <span
                        onClick={() => setWordLength(7)}
                        className={wordLength === 7 ? "active" : ""}
                    >
                        <p>7</p>
                    </span>
                </div>

                <div className='startpage--uniqueLetters'>
                    <p>Unique letters</p>
                    <label className='switch'>
                        <input
                            value={uniqueLetters}
                            type="checkbox"
                            onChange={() => setUniqueLetters(!uniqueLetters)}
                        />
                        <span className='slider round'></span>
                    </label>
                </div>

                <button
                    className='startpage--startGame'
                    onClick={startGame}
                >
                    Start Game
                </button>
            </div>

            <div className='startpage--rules'>
                <label>
                    <span className='startpage--correct'></span>
                    <p>Correct</p>
                </label>
                <label>
                    <span className='startpage--misplaced'></span>
                    <p>Misplaced</p>
                </label>
                <label>
                    <span className='startpage--incorrect'></span>
                    <p>Incorrect</p>
                </label>
            </div>
        </div>
    )
}

export default StartPage
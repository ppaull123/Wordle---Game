function GamePage({
  guesses,
  newTime,
  wordLength,
  emptyRows,
  guess,
  setGuess,
  submitGuess,
  inputRef
}) {

  return (
    <div className='container'>
      <div className='gamepage'>
        <h1 className='gamepage--header'>WORDLE</h1>
        <p className='gamepage--ptag'>Guess the secret word</p>

        <div className='gamepage--banner'>
          <p>Guesses: {guesses.length}</p>
          <p>Time: {newTime}</p>
          <p>Word Length: {wordLength}</p>
        </div>

        <div className='gamepage--feedbackGrid'>
          {guesses.map((item, index) => (
            <div className='gamepage--letters' key={index}>
              {item.feedback.map((feedbackObj, i) => (
                <span
                  key={i}
                  className={`gamepage--${feedbackObj.result}`}
                >
                  {feedbackObj.letter}
                </span>
              ))}
            </div>
          ))}

          {Array.from({ length: emptyRows }).map((_, rowIndex) => (
            <div className='gamepage--letters' key={`empty-${rowIndex}`}>
              {Array.from({ length: wordLength }).map((_, colIndex) => (
                <span
                  key={colIndex}
                  className='gamepage--empty'
                ></span>
              ))}
            </div>
          ))}
        </div>

        <div className='gamepage--guess'>
          <input
            className='gamepage--guessInput'
            ref={inputRef}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitGuess()
              }
            }}
          />
          <button className='gamepage--guessBtn' onClick={submitGuess}>
            Guess
          </button>
        </div>
      </div>
    </div>
  )
}

export default GamePage
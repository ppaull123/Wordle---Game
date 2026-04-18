import { useState, useEffect, useRef } from 'react'
import './App.css'

import { startGameRequest, submitGuessRequest, saveHighscoreRequest } from "./api"

import Header from "./components/Header.jsx"
import StartPage from "./components/StartPage.jsx"
import GamePage from "./components/GamePage.jsx"
import ResultModal from "./components/ResultModal.jsx"

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameID, setGameID] = useState("");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([])
  const [uniqueLetters, setUniqueLetters] = useState(true)
  const [wordLength, setWordLength] = useState(5)
  const [isFinished, setIsFinished] = useState(false)
  const [time, setTime] = useState(0)
  const [isWin, setIsWin] = useState(false)
  const [secretWord, setSecretWord] = useState("")
  const [name, setName] = useState("")
  const [saveMessage, setSaveMessage] = useState("")
  const [page, setPage] = useState("start")
  const inputRef = useRef(null)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const newTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const maxGuesses = 6;
  const emptyRows = maxGuesses - guesses.length;

  useEffect(() => {
    if (!gameStarted || isFinished) return

    const interval = setInterval(() => {
      setTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStarted, isFinished])

  async function startGame() {
    try {
      const data = await startGameRequest(wordLength, uniqueLetters)

      console.log(data)
      setGameStarted(true)
      setGameID(data.gameID)
      setGuesses([])
      setTime(0)
      setIsFinished(false)
      setTimeout(() => {
        inputRef.current.focus()
      }, 0)

      setIsWin(false)
      setSecretWord("")
      setName("")
      setSaveMessage("")
      setPage("game")
    } catch (error) {
      console.log(error.message)
    }
  }

  async function submitGuess() {
    try {
      const data = await submitGuessRequest(gameID, guess)

      setGuesses(data.guesses)
      setGuess("")
      setIsFinished(data.isFinished)
      inputRef.current.focus()
      setIsWin(data.isWin)
      setSecretWord(data.secretWord)

    } catch (error) {
      console.log(error.message)
    }
  }

  async function saveHighscore() {
    try {
      const data = await saveHighscoreRequest(name, gameID)

      console.log(data)
      setSaveMessage("Highscore saved!")
      setName("")

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Header setPage={setPage} />
      <div className='container'>
        {page === "start" && (
          <StartPage
            wordLength={wordLength}
            setWordLength={setWordLength}
            uniqueLetters={uniqueLetters}
            setUniqueLetters={setUniqueLetters}
            startGame={startGame}
          />
        )}

        {page === "game" && (
          <GamePage
            guesses={guesses}
            newTime={newTime}
            wordLength={wordLength}
            emptyRows={emptyRows}
            guess={guess}
            setGuess={setGuess}
            submitGuess={submitGuess}
            inputRef={inputRef}
          />
        )}

        <ResultModal
          isFinished={isFinished}
          isWin={isWin}
          secretWord={secretWord}
          newTime={newTime}
          guesses={guesses}
          name={name}
          setName={setName}
          saveHighscore={saveHighscore}
          saveMessage={saveMessage}
          startGame={startGame}
        />

      </div>
    </>
  )
}

export default App

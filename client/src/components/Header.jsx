function Header({ setPage }) {
    return (
        <div className="header">
            <a href="/" className="logo">WORDLE</a>
            <nav>
                <button onClick={() => setPage("start")}>Play</button>
                <a href="/highscore">Highscore</a>
                <a href="/about">About</a>
            </nav>
        </div>
    )
}

export default Header
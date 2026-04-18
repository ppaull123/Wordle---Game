export function checkGuess(guess, secretWord) {
    let result = [];
    let used = new Array(secretWord.length).fill(false);

    for (let i = 0; i < guess.length; i++) {


        if (guess[i] === secretWord[i]) {
            result.push(
                { letter: guess[i], result: "correct" }
            )

            used[i] = true;
        }

        else {
            result.push(
                { letter: guess[i], result: "incorrect" }
            )
        }
    }

    for (let i = 0; i < guess.length; i++) {

        if (result[i].result === "incorrect") {

            for (let j = 0; j < secretWord.length; j++) {

                if (guess[i] === secretWord[j] && used[j] === false) {
                    result[i].result = "misplaced";
                    used[j] = true;
                    break;
                }

            }
        }

    }

    return result;
}

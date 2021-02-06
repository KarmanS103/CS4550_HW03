import { useState } from 'react';
import { generate_secret, checkguess, validateGuess } from './game'
import logo from './logo.svg';
import './App.css';

/**
 * Pieces of this code were based on the logic described in Professor Tuck's Lecture 4 and 5 code as 
 * well as the official React and MDN Documentation.
 */

/**
 * Design Decisions: 
 * Once 4 characters are inputted, the guess must be submitted.
 * Invalid guesses do not affect the number of lives. 
 * A valid guess is any sequence of four unique digits.
 * 
 */

 /**
  * Given the list of guesses, calculates the bull and cow score and adds the guess and score
  * to the table of guesses and corresponding results. 
  * Attribution: Nat Tuck's Hangman Code. 
  * 
  * @param {*} guesses all of the valid guesses inputted by the user
  */
function Guesses(guesses) {
  let keys = Object.keys(guesses["guesses"])
  let values = []

  keys.forEach(key => values.push(guesses["guesses"][key]))

  let double = []
  for (let i = 0; i < keys.length; i++) {
    double.push(<tr>
      <td>
        {keys[i]}
      </td>
      <td>
        {values[i]}
      </td>
    </tr>)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Guess</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {double}
      </tbody>
    </table>
  )
}

function App() {
  const [secret, setSecret] = useState(generate_secret());
  const [guesses, setGuesses] = useState({});
  const [lives, setLives] = useState(8);
  const [text, setText] = useState("");
  const [validguess, setValidGuess] = useState(true);
  const [won, setWon] = useState(false);
  const [lose, setLose] = useState(false);

  function guess() {
    let guessval = validateGuess(text);
    setValidGuess(guessval);

    if (guessval) {
      if (text === secret) {
        setWon(true);
      }

      if (lives === 1) {
        setLose(true);
      }

      let gss = checkguess(guesses, text, secret);
      setGuesses(gss)
      setText("")
      setLives(8 - Object.keys(gss).length)
    }

    setText("")
  }

  /**
   * Based on Nat Tuck's Hangman Code.
   */
  function updateText(ev) {
    let txt = ev.target.value;

    if (text.length >= 4) {
      return
    } else {
      setText(txt)
    }
  }

  /**
   * Attribution: Nat Tuck's Hangman Code. 
   * 
   * @param {*} ev keyPressed Event
   */
  function keyPressed(ev) {
    if (ev.key === "Enter") {
      guess();
    }
  }

  function reset() {
    setSecret(generate_secret());
    setGuesses([]);
    setLives(8);
    setText("")
    setValidGuess(true)
    setWon(false);
    setLose(false);
  }

  if (won) {
    return (
      <div className="App">
        <h1>You win!</h1>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }

  if (lose) {
    return (
      <div className="App">
        <h1>Game Over!</h1>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }

  if (validguess) {
    return (
      <div className="App">
        <h2>Lives: {lives} </h2>
        <Guesses guesses={guesses}></Guesses><br></br>
        <input type="text" value={text} onChange={updateText} onKeyPress={keyPressed} />
        <br></br><br></br>
        <button onClick={guess}>Guess</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Invalid Guess Given!</h1>
        <h2>Lives: {lives} </h2>
        <Guesses guesses={guesses}></Guesses><br></br>
        <input type="text" value={text} onChange={updateText} onKeyPress={keyPressed} />
        <br></br><br></br>
        <button onClick={guess}>Guess</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }
}

export default App;

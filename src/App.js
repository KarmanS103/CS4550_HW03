import { useState } from 'react';
import { generate_secret, checkguess } from './game'
import logo from './logo.svg';
import './App.css';

function Guesses(guesses) {
  console.log(guesses)
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
  const [lives, setLives] = useState(8)
  const [text, setText] = useState("")

  function guess() {
    if (text === secret) {
      alert("you win")
    }

    let gss = checkguess(guesses, text, secret);
    setGuesses(gss)
    setText("")
    setLives(8 - Object.keys(gss).length)

    if (lives === 1) {
      alert("you lose")
    }
  }

  function updateText(ev) {
    if (ev.key === "Backspace") {
      let txt = ev.target.value;

      setText(txt)
    }
    if (text.length >= 4) {
      return
    }
    let txt = ev.target.value;
    setText(txt)
  }

  function keyPressed(ev) {
    if (ev.key === "Enter") {
      guess();
    }
    if (ev.key === "Backspace") {
      setText(text.concat("Backspace"))
    }
  }

  function reset() {
    setSecret(generate_secret());
    setGuesses([]);
    setLives(8);
  }

  return (
    <div className="App">
      <h1>Secret: {secret} </h1>
      <h2>Lives: {lives} </h2>
      <Guesses guesses={guesses}></Guesses><br></br>
      <input type="text" value={text} onChange={updateText} onKeyPress={keyPressed} />
      <br></br><br></br>
      <button onClick={guess}>Guess</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { generateGrid } from "./helpers";

function App() {
  const word = "clone".split("");
  const wordLength = word.length;
  const [attempts, setAttempts] = useState(generateGrid(wordLength));
  const [submittedAttempts, setSubmittedAttempts] = useState(
    generateGrid(wordLength)
  );
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reset = () => {
    setCurrentIndex(0);
    setCurrentAttempt(0);
    setAttempts(generateGrid(wordLength));
    setSubmittedAttempts(generateGrid(wordLength));
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.match(/^[a-zA-Z]$/)) {
        if (currentIndex >= wordLength) {
          return;
        }
        const newAttempts = [...attempts];

        newAttempts[currentAttempt][currentIndex] = e.key;
        setAttempts(newAttempts);
        setCurrentIndex(currentIndex + 1);
      }

      if (e.key === "Backspace") {
        if (currentIndex === 0) {
          return;
        }

        const newAttempts = [...attempts];

        newAttempts[currentAttempt][currentIndex - 1] = null;
        setAttempts(newAttempts);
        setCurrentIndex(currentIndex - 1);
      }

      if (e.key === "Enter") {
        if (currentIndex !== wordLength) {
          return;
        }
        const newSubmittedAttempts = [...submittedAttempts];
        const wordSplit = JSON.parse(JSON.stringify(word));
        for (let i = 0; i < wordLength; i++) {
          if (word[i] === attempts[currentAttempt][i]) {
            console.log("yes");
            newSubmittedAttempts[currentAttempt][i] = "same";
            const index = wordSplit.indexOf(wordSplit[i]);
            wordSplit.splice(index, 1);
          } else if (wordSplit.includes(attempts[currentAttempt][i])) {
            newSubmittedAttempts[currentAttempt][i] = "diff";
            const index = wordSplit.indexOf(attempts[currentAttempt][i]);
            wordSplit.splice(index, 1);
          } else {
            console.log("yes3");
            newSubmittedAttempts[currentAttempt][i] = "no-match";
          }
        }
        setSubmittedAttempts(newSubmittedAttempts);
        setCurrentIndex(0);
        setCurrentAttempt(currentAttempt + 1);

        if (attempts[currentAttempt].join("") === word.join("")) {
          alert("success");
          reset();
        } else if (currentAttempt === 5) {
          alert("fail");
          reset();
        }
      }
    };

    document.addEventListener("keyup", handler);

    return () => document.removeEventListener("keyup", handler);
  });

  return (
    <>
      <h1>Wordle</h1>
      {attempts.map((attempt, key) => {
        return (
          <div className="row" key={key}>
            {attempt.map((char, key2) => {
              return (
                <p
                  className={`box ${
                    submittedAttempts[key][key2] === "same" ? "bg-green" : ""
                  } ${
                    submittedAttempts[key][key2] === "diff" ? "bg-yellow" : ""
                  } ${
                    submittedAttempts[key][key2] === "no-match" ? "bg-grey" : ""
                  }`}
                  key={key2}
                >
                  {char}
                </p>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;

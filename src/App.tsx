import { useEffect, useState } from "react";
import { generateGrid } from "./helpers";

function App() {
  const word = "brave".split("");
  const wordLength = word.length;
  const [attempts, setAttempts] = useState(generateGrid(wordLength));
  const [submittedAttempts, setSubmittedAttempts] = useState(
    generateGrid(wordLength),
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
            newSubmittedAttempts[currentAttempt][i] = "same";
            const index = wordSplit.indexOf(attempts[currentAttempt][i]);
            wordSplit.splice(index, 1);
          } else if (wordSplit.includes(attempts[currentAttempt][i])) {
            newSubmittedAttempts[currentAttempt][i] = "diff";
            const index = wordSplit.indexOf(attempts[currentAttempt][i]);
            wordSplit.splice(index, 1);
          } else {
            newSubmittedAttempts[currentAttempt][i] = "no-match";
          }
        }
        setSubmittedAttempts(newSubmittedAttempts);
        setCurrentIndex(0);
        setCurrentAttempt(currentAttempt + 1);

        if (attempts[currentAttempt].join("") === word.join("")) {
          setTimeout(() => {
            alert("success");
            reset();
          }, 10);
        } else if (currentAttempt === 5) {
          setTimeout(() => {
            alert("success");
            reset();
          }, 10);
        }
      }
    };

    document.addEventListener("keyup", handler);

    return () => document.removeEventListener("keyup", handler);
  });

  return (
    <>
      <h1 className="mb-4 text-5xl font-bold uppercase">Wordle</h1>
      {attempts.map((attempt, key) => {
        return (
          <div className="flex gap-4" key={key}>
            {attempt.map((char, key2) => {
              return (
                <p
                  className={`flex size-10 items-center justify-center rounded border-2 border-solid border-white text-sm font-bold uppercase sm:size-14 sm:text-xl ${
                    submittedAttempts[key][key2] === "same" ? "bg-gray-600" : ""
                  } ${
                    submittedAttempts[key][key2] === "diff"
                      ? "bg-yellow-600"
                      : ""
                  } ${
                    submittedAttempts[key][key2] === "no-match"
                      ? "bg-green-600"
                      : ""
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

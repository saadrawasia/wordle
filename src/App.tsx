import { useEffect, useState } from "react";
import { generateGrid } from "./helpers";
import clsx from "clsx";
import "./App.css";
import { words } from "./data/data";

function App() {
  const [word, setWord] = useState(() =>
    words[Math.floor(Math.random() * words.length)].split(""),
  );
  const wordLength = word.length;
  const [attempts, setAttempts] = useState(generateGrid(wordLength));
  const [submittedAttempts, setSubmittedAttempts] = useState(
    generateGrid(wordLength),
  );
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameFinishedState, setGameFinishedState] = useState<string | null>(
    null,
  );

  const reset = () => {
    setCurrentIndex(0);
    setCurrentAttempt(0);
    setAttempts(generateGrid(wordLength));
    setSubmittedAttempts(generateGrid(wordLength));
    setGameFinishedState(null);
    setWord(words[Math.floor(Math.random() * words.length)].split(""));
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (typeof gameFinishedState === "string") {
        return;
      }

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
        if (
          currentIndex !== wordLength ||
          !words.includes(attempts[currentAttempt].join(""))
        ) {
          document
            .getElementById(`row-${currentAttempt}`)
            ?.classList.add("shake-horizontal");
          setTimeout(() => {
            document
              .getElementById(`row-${currentAttempt}`)
              ?.classList.remove("shake-horizontal");
          }, 300);
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
          setGameFinishedState("success");
        } else if (currentAttempt === 5) {
          setGameFinishedState("fail");
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
          <div className="flex gap-4" key={key} id={`row-${key}`}>
            {attempt.map((char, key2) => {
              return (
                <p
                  className={clsx(
                    "flex size-10 items-center justify-center rounded border-2 border-solid border-white text-sm font-bold uppercase sm:size-14 sm:text-xl",
                    {
                      "bg-gray-600":
                        submittedAttempts[key][key2] === "no-match",
                      "bg-yellow-600": submittedAttempts[key][key2] === "diff",
                      "bg-green-600": submittedAttempts[key][key2] === "same",
                    },
                  )}
                  key={key2}
                >
                  {char}
                </p>
              );
            })}
          </div>
        );
      })}
      {gameFinishedState === "success" && (
        <h2 className="mb-2 mt-4 text-3xl font-bold uppercase text-green-600">
          Congratulations!
        </h2>
      )}
      {gameFinishedState === "fail" && (
        <div className="text-center">
          <h2 className="mb-2 mt-4 text-3xl font-bold uppercase text-red-600">
            You Lost!
          </h2>
          <p>Correct word was:</p>
          <div className="flex gap-2">
            {word.map((char, i) => {
              return (
                <p
                  className="flex size-8 items-center justify-center rounded border-2 border-solid border-white bg-green-600 text-sm font-bold uppercase"
                  key={i}
                >
                  {char}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {gameFinishedState && (
        <button
          onClick={reset}
          className="rounded bg-slate-600 px-4 py-3 text-xl text-white"
        >
          Restart
        </button>
      )}
    </>
  );
}

export default App;

"use client";

import React, { useState } from "react";
import wordleWordJson from "./words.json";
const CORRECT_WORD = "DONUT";
const words = wordleWordJson as string[];
const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

function Keyboard({
  handleKeyPress,
  getKeyboardKeyColor,
}: {
  handleKeyPress: (key: string) => void;
  getKeyboardKeyColor: (key: string) => string;
}) {
  return (
    <div className="w-screen flex flex-col mb-4">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className={`${
                key === "ENTER" || key === "⌫" ? "px-4" : "w-10"
              } h-14 ${getKeyboardKeyColor(key)} rounded font-bold text-sm sm:text-base
                hover:opacity-90 active:opacity-70 transition-opacity`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleKeyPress = (key: string) => {
    if (gameOver) return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => (prev + key).toUpperCase());
    }
  };

  const submitGuess = () => {
    setMessage("");
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage("Word must be 5 letters long");
      return;
    }

    if (!words.includes(currentGuess.toLowerCase())) {
      setMessage("Not in word list");
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");
    setMessage("");

    if (currentGuess === CORRECT_WORD) {
      setGameOver(true);
      setMessage("You won! 🎉");
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage(`Game Over! The word was ${CORRECT_WORD}`);
    }
  };

  const getLetterColor = (letter: string, index: number) => {
    if (letter === CORRECT_WORD[index]) {
      return "bg-green-500";
    }
    if (CORRECT_WORD.includes(letter)) {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  const getKeyboardKeyColor = (key: string) => {
    if (!guesses.length) return "bg-gray-400";

    let maxColor = "bg-gray-400";
    for (const guess of guesses) {
      const indices = [...guess]
        .map((letter, index) => (letter === key ? index : -1))
        .filter((i) => i !== -1);
      for (const index of indices) {
        if (CORRECT_WORD[index] === key) {
          return "bg-green-500";
        }
        if (CORRECT_WORD.includes(key)) {
          maxColor = "bg-yellow-500";
        } else {
          maxColor = "bg-gray-600";
        }
      }
    }
    return maxColor;
  };

  function titleOrMessage() {
    if (message) return message;
    return "Schmurdle";
  }

  return (
    <div className="bg-gray-900 text-white flex flex-col items-center pt-8 px-4">
      <h1 className="text-4xl font-bold mb-8">{titleOrMessage()}</h1>

      <div className="grid gap-2 mb-4">
        {[...Array(MAX_ATTEMPTS)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {[...Array(WORD_LENGTH)].map((_, colIndex) => {
              const letter =
                rowIndex < guesses.length
                  ? guesses[rowIndex][colIndex]
                  : rowIndex === guesses.length &&
                      colIndex < currentGuess.length
                    ? currentGuess[colIndex]
                    : "";

              const colorClass =
                rowIndex < guesses.length
                  ? getLetterColor(letter, colIndex)
                  : "bg-gray-700";

              return (
                <div
                  key={colIndex}
                  className={`w-12 h-12 ${colorClass} flex items-center justify-center text-2xl font-bold rounded`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Keyboard
        handleKeyPress={handleKeyPress}
        getKeyboardKeyColor={getKeyboardKeyColor}
      />
    </div>
  );
}

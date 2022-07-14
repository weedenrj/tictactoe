import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

/**
 * @author Rob Weeden
 * @date 7/14/2022
 * @brief A Tic-Tact-Toe game build with NextJS, TailwindCSS, Typescript and including preact.
 *        This is typically what I install in every project.
 *
 * ? 1 hour version - game is fully playable with tie detection
 * ? and meets all required functionality. Might have bugs and messy code.
 *
 * @returns The full game in a web page
 */
const Home: NextPage = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [xGoes, setXGoes] = useState(true);
  const [winner, setWinner] = useState("");
  const [cpuPlayer, setCpuPlayer] = useState(false);
  const [isTie, setIsTie] = useState(false);

  function playGame(symbol: string, key: number) {
    if (!winner) {
      let boardCopy = [...board]; // reference variables cost me 3 minutes 🙄

      if (symbol == "") {
        if (xGoes) {
          boardCopy[key] = "X";
          setBoard(boardCopy);
        } else {
          boardCopy[key] = "O";
          setBoard(boardCopy);
        }
        setXGoes(!xGoes);
      }
    }
  }

  function computerTurn() {
    let num = Math.floor(Math.random() * 9);
    let boardCopy = [...board];
    while (boardCopy[num] != "") {
      num = Math.floor(Math.random() * 9);
    }
    console.log(num);
    boardCopy[num] = "O";
    setBoard(boardCopy);
    setXGoes(!xGoes);
  }

  function reset() {
    setBoard(["", "", "", "", "", "", "", "", ""]);
  }

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombos.forEach((line) => {
      const [a, b, c] = line;
      if (board[a] && board[b] === board[a] && board[c] === board[a]) {
        setWinner(board[a]);
      }
    });

    if (!winner) {
      checkTie();
    }
  }

  function checkTie() {
    let hasEmptySpaces = false;
    board.forEach((element) => {
      if (element === "") {
        hasEmptySpaces = true;
      }
    });
    if (!hasEmptySpaces) {
      setIsTie(true);
    }
  }

  function startNewGame() {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    if (winner === "X") {
      setXGoes(false);
    } else {
      setXGoes(true);
    }
    setWinner("");
  }

  function restart() {
    setCpuPlayer(false);
    reset();
    setWinner("");
    setIsTie(false);
    setXGoes(true);
  }
  useEffect(() => {
    if (!xGoes && cpuPlayer) {
      computerTurn();
    }
  }, [xGoes]);

  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      {!winner && !isTie && (
        <>
          {/* BOARD */}
          <div className="grid grid-cols-3 border-2 border-black">
            {board.map((symbol, key) => (
              <button
                className="w-24 h-24 border-2 border-black text-3xl"
                onClick={() => playGame(symbol, key)}
                key={key}
              >
                {symbol}
              </button>
            ))}
          </div>

          {/* OTHER STUFF */}
          <div className="flex">
            <button className="btns" onClick={() => reset()}>
              Reset Game
            </button>
            <button
              className="btns"
              onClick={() => {
                setCpuPlayer(!cpuPlayer);
                reset();
                setWinner("");
              }}
            >
              Practice against a computer: {String(cpuPlayer)}
            </button>
          </div>
        </>
      )}

      {winner && (
        <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
          <div className="text-3xl">{winner} Has Won The Game!</div>
          <button className="btns" onClick={() => startNewGame()}>
            Play another game?
          </button>
        </div>
      )}

      {isTie && (
        <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
          <div className="text-3xl">Tie Game!</div>
          <button
            className="btns"
            onClick={() => {
              restart();
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};
export default Home;

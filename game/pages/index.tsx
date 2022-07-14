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
 * ! 30 minute version - game is clickable but not winable
 *
 * @returns The full game in a web page
 */
const Home: NextPage = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [xGoes, setXGoes] = useState(true);
  const [winner, setWinner] = useState("");
  const [cpuPlayer, setCpuPlayer] = useState(false);

  function playGame(symbol: string, key: number) {
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
    return;
  }

  useEffect(() => {
    if (!xGoes && cpuPlayer) {
      computerTurn();
      return;
    }
  }, [xGoes]);

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
  
  

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      {/* WINNER */}
      {winner && <div className="text-3xl">{winner} Has Won The Game!</div>}

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
          }}
        >
          Practice against a computer: {String(cpuPlayer)}
        </button>
      </div>
    </div>
  );
};

export default Home;

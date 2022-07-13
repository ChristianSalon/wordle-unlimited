import { motion } from "framer-motion";
import React from "react";
import { useAppState } from "../hooks";

interface Props {
  didWin: boolean;
}

const GameOver: React.FC<Props> = ({ didWin }) => {
  const { word, newGame } = useAppState();

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-gray-300 bg-opacity-50 min-w-screen min-h-screen flex justify-center items-center">
      <div className="px-10 xs:px-20 py-12 shadow-xl bg-white rounded-md text-center">
        <h2 className="font-medium text-lg mb-2">
          {didWin ? "You won!" : "You lost!"}
        </h2>
        <h3 className="font-medium text-sm text-gray-700 mb-8">{`The word was ${word}`}</h3>
        <span
          className="px-6 py-3 rounded-md bg-green-500 hover:bg-green-600 cursor-pointer text-white"
          onClick={newGame}
        >
          Play again
        </span>
      </div>
    </div>
  );
};

export default GameOver;

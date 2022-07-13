import React, { useState } from "react";
import { useAppState } from "../hooks";
import { Answer } from "../types";
import { motion } from "framer-motion";

interface Props {
  rowNumber: number;
  position: number;
  shouldAnimate: boolean;
}

const BoardLetter: React.FC<Props> = ({
  rowNumber,
  position,
  shouldAnimate,
}) => {
  const { board, attemptNumber, input } = useAppState();

  const displayInfo = () => {
    if (attemptNumber === rowNumber) {
      return input[position];
    } else {
      return board[rowNumber][position].letter;
    }
  };

  const getBgColor = () => {
    switch (board[rowNumber][position].state) {
      case Answer.Correct:
        return "#86efac";
      case Answer.Wrong:
        return "#4b5563";
      case Answer.Almost:
        return "#fcd34d";
      default:
        return "#d1d5db";
    }
  };

  const variants = {
    animate: {
      opacity: [0.2, 0.4, 1],
      rotateY: [0, 180, 0],
      backgroundColor: ["#d1d5db", getBgColor()],
      transition: {
        duration: 1,
        delay: position * 0.8,
        ease: "easeIn",
      },
    },
    stop: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className={`bg-gray-300 flex justify-center items-center rounded-sm mx-1 text-2xl w-14 h-14`}
      variants={variants}
      animate={shouldAnimate ? "animate" : "stop"}
    >
      {displayInfo()}
    </motion.div>
  );
};

export default BoardLetter;

import { motion } from "framer-motion";
import React from "react";
import BoardRow from "./BoardRow";

const Board: React.FC = () => {
  return (
    <div className="">
      <motion.div
        animate={{ scale: [0.8, 1], opacity: [0.2, 1] }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <BoardRow rowNumber={0} />
      </motion.div>
      <motion.div
        animate={{ scale: [0.8, 1], opacity: [0.2, 1] }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <BoardRow rowNumber={1} />
      </motion.div>
      <motion.div
        animate={{ scale: [0.8, 1], opacity: [0.2, 1] }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BoardRow rowNumber={2} />
      </motion.div>
      <motion.div
        animate={{ scale: [0.8, 1], opacity: [0.2, 1] }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <BoardRow rowNumber={3} />
      </motion.div>
      <motion.div
        animate={{ scale: [0.8, 1], opacity: [0.2, 1] }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <BoardRow rowNumber={4} />
      </motion.div>
      <motion.div
        animate={{ scale: [0.8, 1], opacity: [0.2, 1] }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <BoardRow rowNumber={5} />
      </motion.div>
    </div>
  );
};

export default Board;

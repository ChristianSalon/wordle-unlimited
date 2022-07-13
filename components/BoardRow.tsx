import React, { useEffect, useState } from "react";
import { useAppState } from "../hooks";
import BoardLetter from "./BoardLetter";

interface Props {
  rowNumber: number;
}

const BoardRow: React.FC<Props> = ({ rowNumber }) => {
  const { attemptNumber } = useAppState();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (attemptNumber === rowNumber + 1 && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [attemptNumber]);

  return (
    <div className="flex justify-center my-2">
      <BoardLetter
        rowNumber={rowNumber}
        position={0}
        shouldAnimate={shouldAnimate}
      />
      <BoardLetter
        rowNumber={rowNumber}
        position={1}
        shouldAnimate={shouldAnimate}
      />
      <BoardLetter
        rowNumber={rowNumber}
        position={2}
        shouldAnimate={shouldAnimate}
      />
      <BoardLetter
        rowNumber={rowNumber}
        position={3}
        shouldAnimate={shouldAnimate}
      />
      <BoardLetter
        rowNumber={rowNumber}
        position={4}
        shouldAnimate={shouldAnimate}
      />
    </div>
  );
};

export default BoardRow;

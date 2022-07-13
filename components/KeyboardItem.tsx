import React, { useEffect, useState } from "react";
import { useAppState } from "../hooks";
import { KeyboardItemState } from "../types";

interface Props {
  item: string;
}

const KeyboardItem: React.FC<Props> = ({ item }) => {
  const { input, setInput, submitAnswer, keyboard } = useAppState();
  const [bgColor, setBgColor] = useState("bg-gray-300 hover:bg-gray-400");

  useEffect(() => {
    const timer = setTimeout(() => setBgColor(getBgColor()), 5000);
    return () => clearTimeout(timer);
  }, [keyboard.get(item)]);

  const onClick = async () => {
    if (item !== "ENTER" && item !== "BACK" && input.length < 5) {
      setInput(input + item);
    } else if (item === "ENTER" && input.length === 5) {
      await submitAnswer();
    } else if (item === "BACK") {
      setInput(input.slice(0, -1));
    }
  };

  const getBgColor = () => {
    switch (keyboard.get(item)) {
      case KeyboardItemState.Correct:
        return "bg-green-300 hover:bg-green-400";
      case KeyboardItemState.Almost:
        return "bg-amber-300 hover:bg-amber-400";
      case KeyboardItemState.Wrong:
        return "bg-gray-600 hover:bg-gray-700";
      default:
        return "bg-gray-300 hover:bg-gray-400";
    }
  };

  return (
    <div
      className={`${bgColor} flex justify-center items-center px-2 xs:px-4 py-2 xs:py-2 mr-1 xs:mx-1 cursor-pointer rounded-sm xs:rounded-md text-sm xs:text-lg`}
      onClick={onClick}
    >
      {item}
    </div>
  );
};

export default KeyboardItem;

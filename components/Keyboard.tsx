import React from "react";
import KeyboardItem from "./KeyboardItem";

const Keyboard: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-center my-2">
        <KeyboardItem item="Q" />
        <KeyboardItem item="W" />
        <KeyboardItem item="E" />
        <KeyboardItem item="R" />
        <KeyboardItem item="T" />
        <KeyboardItem item="Y" />
        <KeyboardItem item="U" />
        <KeyboardItem item="I" />
        <KeyboardItem item="O" />
        <KeyboardItem item="P" />
      </div>
      <div className="flex justify-center mb-2">
        <KeyboardItem item="A" />
        <KeyboardItem item="S" />
        <KeyboardItem item="D" />
        <KeyboardItem item="F" />
        <KeyboardItem item="G" />
        <KeyboardItem item="H" />
        <KeyboardItem item="J" />
        <KeyboardItem item="K" />
        <KeyboardItem item="L" />
      </div>
      <div className="flex justify-center mb-2">
        <KeyboardItem item="ENTER" />
        <KeyboardItem item="Z" />
        <KeyboardItem item="X" />
        <KeyboardItem item="C" />
        <KeyboardItem item="V" />
        <KeyboardItem item="B" />
        <KeyboardItem item="N" />
        <KeyboardItem item="M" />
        <KeyboardItem item="BACK" />
      </div>
    </div>
  );
};

export default Keyboard;

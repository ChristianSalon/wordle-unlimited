import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Answer, KeyboardItemState } from "../types";

const defaultBoard: LetterProps[][] = [
  [
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
  ],
  [
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
  ],
  [
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
  ],
  [
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
  ],
  [
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
  ],
  [
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
    { letter: "", state: Answer.Unanswered },
  ],
];

interface LetterProps {
  letter: string;
  state: Answer;
}

const defaultKeyboard: Map<string, KeyboardItemState> = new Map([
  ["Q", KeyboardItemState.Default],
  ["W", KeyboardItemState.Default],
  ["E", KeyboardItemState.Default],
  ["R", KeyboardItemState.Default],
  ["T", KeyboardItemState.Default],
  ["Y", KeyboardItemState.Default],
  ["U", KeyboardItemState.Default],
  ["I", KeyboardItemState.Default],
  ["O", KeyboardItemState.Default],
  ["P", KeyboardItemState.Default],
  ["A", KeyboardItemState.Default],
  ["S", KeyboardItemState.Default],
  ["D", KeyboardItemState.Default],
  ["F", KeyboardItemState.Default],
  ["G", KeyboardItemState.Default],
  ["H", KeyboardItemState.Default],
  ["J", KeyboardItemState.Default],
  ["K", KeyboardItemState.Default],
  ["L", KeyboardItemState.Default],
  ["ENTER", KeyboardItemState.Default],
  ["Z", KeyboardItemState.Default],
  ["X", KeyboardItemState.Default],
  ["C", KeyboardItemState.Default],
  ["V", KeyboardItemState.Default],
  ["B", KeyboardItemState.Default],
  ["N", KeyboardItemState.Default],
  ["M", KeyboardItemState.Default],
  ["BACK", KeyboardItemState.Default],
]);

interface Props {
  word: string;
  setWord: (word: string) => void;
  input: string;
  setInput: (input: string) => void;
  board: LetterProps[][];
  setBoard: (board: LetterProps[][]) => void;
  keyboard: Map<string, KeyboardItemState>;
  setKeyboard: (keyboard: Map<string, KeyboardItemState>) => void;
  attemptNumber: number;
  setAttemptNumber: (attemptNumber: number) => void;
  submitAnswer: () => Promise<void>;
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
  didWin: boolean;
  setDidWin: (didWin: boolean) => void;
  newGame: () => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const AppContext = createContext<Props>({} as any);

export const AppProvider: React.FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();

  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [board, setBoard] = useState<LetterProps[][]>(defaultBoard);
  const [keyboard, setKeyboard] =
    useState<Map<string, KeyboardItemState>>(defaultKeyboard);
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [didWin, setDidWin] = useState(false);

  const submitAnswer = async () => {
    if (gameOver) return;
    const wordExists = await checkIfExists();
    if (!wordExists) return;

    // Set board
    let answers = board;
    for (let i = 0; i < board[attemptNumber].length; i++) {
      answers[attemptNumber][i].letter = input.charAt(i);
    }
    setBoard(answers);

    validateAnswer();

    if (word === input) {
      setTimeout(() => {
        setGameOver(true);
        setDidWin(true);
      }, 5000);
    } else if (attemptNumber === 5) {
      setTimeout(() => {
        setGameOver(true);
        setDidWin(false);
      }, 5000);
    }

    setAttemptNumber(attemptNumber + 1);
    setInput("");
  };

  const newGame = () => {
    router.reload();
  };

  const validateAnswer = () => {
    let newKeyboard = new Map(keyboard);
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === input.charAt(i)) {
        board[attemptNumber][i].state = Answer.Correct;
        newKeyboard.set(word.charAt(i), KeyboardItemState.Correct);
      } else if (word.indexOf(input.charAt(i)) > -1) {
        board[attemptNumber][i].state = Answer.Almost;
        if (newKeyboard.get(input.charAt(i)) !== KeyboardItemState.Correct) {
          newKeyboard.set(input.charAt(i), KeyboardItemState.Almost);
        }
      } else {
        board[attemptNumber][i].state = Answer.Wrong;
        if (
          newKeyboard.get(input.charAt(i)) !== KeyboardItemState.Correct &&
          newKeyboard.get(input.charAt(i)) !== KeyboardItemState.Almost
        ) {
          newKeyboard.set(input.charAt(i), KeyboardItemState.Wrong);
        }
      }
    }
    setKeyboard(newKeyboard);
  };

  const checkIfExists = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
      );
    } catch (e: any) {
      alert("Please enter a valid word.");
      return false;
    }
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        word,
        setWord,
        input,
        setInput,
        board,
        setBoard,
        keyboard,
        setKeyboard,
        attemptNumber,
        setAttemptNumber,
        submitAnswer,
        gameOver,
        setGameOver,
        didWin,
        setDidWin,
        newGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default function useAppState() {
  return useContext(AppContext);
}

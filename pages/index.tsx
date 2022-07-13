import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Board, GameOver, Keyboard } from "../components";
import { useAppState } from "../hooks";

interface Props {
  word: string;
}

const Home: NextPage<Props> = ({ word }) => {
  const { input, setInput, submitAnswer, gameOver, didWin, setWord } =
    useAppState();

  useEffect(() => {
    setWord(word);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInput);
    return () => {
      document.removeEventListener("keydown", handleKeyboardInput);
    };
  });

  async function handleKeyboardInput(
    this: Document,
    event: globalThis.KeyboardEvent
  ) {
    const key = event.key.toUpperCase();
    const charCode = event.keyCode;
    if (charCode !== 8 && charCode !== 13 && (charCode < 65 || charCode > 90))
      return;
    if (key !== "ENTER" && key !== "BACKSPACE" && input.length < 5) {
      setInput(input + key);
    } else if (key === "ENTER" && input.length === 5) {
      await submitAnswer();
    } else if (key === "BACKSPACE") {
      setInput(input.slice(0, -1));
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Wordle Unlimited</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <header className="p-4 text-center font-medium text-xl border-b-2 mb-6">
        Wordle Unlimited
      </header>

      <main className="flex-1 flex flex-col justify-around">
        <Board />
        <Keyboard />
        {gameOver ? <GameOver didWin={didWin} /> : null}
      </main>

      <footer className="p-4 text-center border-t-2">
        <p>Made with &#10084;&#65039; by Christian Saloň.</p>
      </footer>
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_URL
        : process.env.PROD_URL
    }/api/word`
  );
  const newWord = response.data.word.toString().toUpperCase();

  return {
    props: { word: newWord },
  };
};

export default Home;

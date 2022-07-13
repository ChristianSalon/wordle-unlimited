// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { words } from "../../words";

interface Data {
  word: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    res.status(200).json({ word: randomWord });
  } catch (error) {
    res.status(500).json({ word: "chair" });
  }
}

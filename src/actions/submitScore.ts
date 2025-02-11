import axios from "axios";
import { calculateUniqueCharacters } from "../helpers/calculateUniqueCharacters";

interface SubmitScoreProps {
  quoteData: {
    _id: string;
    content: string;
    author: string;
  };
  gameStartTime: number | null;
  userName: string;
  wrongGuesses: number;
}

export const submitScore = async ({
  quoteData,
  gameStartTime,
  userName,
  wrongGuesses,
}: SubmitScoreProps): Promise<boolean> => {
  if (!quoteData || !gameStartTime || !userName) return false;

  const submitData = {
    quoteId: quoteData._id,
    length: quoteData.content.length,
    uniqueCharacters: calculateUniqueCharacters(quoteData.content),
    userName: userName,
    errors: wrongGuesses,
    duration: Date.now() - gameStartTime,
  };

  try {
    await axios.post(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
      submitData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Score submitted successfully");
    return true;
  } catch (error) {
    console.error("Failed to submit score:", error);
    return false;
  }
};

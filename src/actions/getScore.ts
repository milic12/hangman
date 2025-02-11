import axios from "axios";

interface Score {
  id: string;
  userName: string;
  length: number;
  uniqueCharacters: number;
  errors: number;
  duration: number;
}

export const getScore = async (): Promise<Score[]> => {
  try {
    const response = await axios.get(
      "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch score data:", error);
    throw new Error("Failed to fetch score data");
  }
};

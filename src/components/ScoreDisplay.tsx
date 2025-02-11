import { useQuery } from "@tanstack/react-query";
import { getScore } from "../actions/getScore";
import { calculateScore } from "../helpers/calculateScore";

interface Score {
  id: string;
  userName: string;
  length: number;
  uniqueCharacters: number;
  errors: number;
  duration: number;
}

type ResponseScore = Score[];

const ScoreDisplay = () => {
  const {
    data: scores,
    isLoading,
    error,
  } = useQuery<ResponseScore>({
    queryKey: ["scores"],
    queryFn: getScore,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading score</div>;

  const calculatedScores = scores
    ?.map((score) => ({
      ...score,
      calculatedScore: calculateScore(
        score.length,
        score.uniqueCharacters,
        score.errors,
        score.duration
      ),
    }))
    .sort((a, b) => b.calculatedScore - a.calculatedScore);

  return (
    <div className="w-full md:w-[500px] p-4">
      <h2 className="text-3xl font-bold mb-4">Score:</h2>
      {calculatedScores?.map((score, index) => (
        <div
          key={score.id}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-2"
        >
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {index + 1}. {score.userName}:{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {score.calculatedScore} points
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScoreDisplay;

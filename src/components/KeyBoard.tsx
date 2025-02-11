interface KeyBoardProps {
  handleGuess: (letter: string) => void;
  guessedLetters: string[];
  gameOver: boolean;
  gameWon: boolean;
}

const KeyBoard = ({
  handleGuess,
  guessedLetters,
  gameOver,
  gameWon,
}: KeyBoardProps) => {
  const keyboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-8">
      {keyboard.map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={
            guessedLetters.includes(letter.toLowerCase()) || gameOver || gameWon
          }
          className={`
              w-12 h-12 text-lg font-semibold rounded-lg
              transition-all duration-200
              ${
                guessedLetters.includes(letter.toLowerCase())
                  ? "bg-gray-200 text-gray-500"
                  : "bg-white border-2 border-gray-300 hover:border-blue-500 active:bg-blue-100"
              }
              disabled:cursor-not-allowed disabled:opacity-50
            `}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default KeyBoard;

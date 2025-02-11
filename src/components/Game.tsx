import { useEffect, useState } from "react";
import { useQuote } from "../hooks/useQuote";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  guessLetter,
  incrementWrongGuesses,
  resetGame,
  setGameWon,
} from "../redux/features/gameSlice";
import MaskedQuoteText from "./MaskedQuoteText";
import { submitScore } from "../actions/submitScore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import KeyBoard from "./KeyBoard";
import { useCachedQuoteSometimes } from "../hooks/useCachedQuoteSometimes";
import SelectDropDown from "./Select";

const Game = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [selectedHook, setSelectedHook] = useState("useQuote");

  const mutation = useMutation({
    mutationFn: submitScore,

    onSuccess: () => {
      toast.success("Succesfully sent your score!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },

    onError: () => {
      toast.error("Error while sending your score!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const quotePromiseFn = () =>
    axios.get("http://api.quotable.io/random").then((result) => result.data);

  //Bonus 2b
  const cachedQuoteHook = useCachedQuoteSometimes(quotePromiseFn);
  //Bonus 2b
  const regularQuoteHook = useQuote(quotePromiseFn);

  const quoteHookSelected =
    selectedHook === "useCachedQuoteSometimes"
      ? cachedQuoteHook
      : regularQuoteHook;

  const { quoteData, status, error, onResolve, onReject } = quoteHookSelected;

  const { guessedLetters, wrongGuesses, gameOver, gameWon, userName } =
    useSelector((state: RootState) => state.game);

  // make sure user has entered name
  useEffect(() => {
    if (!userName?.trim()) {
      navigate("/");
    }
  }, [userName, navigate]);

  const handleGuess = (letter: string) => {
    if (gameOver || gameWon) return;

    const normalizedLetter = letter.toLowerCase();
    if (!guessedLetters.includes(normalizedLetter)) {
      dispatch(guessLetter(normalizedLetter));

      const normalizedQuote = quoteData?.content.toLowerCase() || "";
      if (!normalizedQuote.includes(normalizedLetter)) {
        dispatch(incrementWrongGuesses());
      }
    }
  };

  useEffect(() => {
    if (quoteData?.content && guessedLetters.length > 0) {
      const remainingLetters = quoteData.content
        .toLowerCase()
        .split("")
        .filter((char: string) => /[a-z]/.test(char))
        .filter((char: string) => !guessedLetters.includes(char));

      if (remainingLetters.length === 0) {
        dispatch(setGameWon());

        mutation.mutate({ quoteData, gameStartTime, userName, wrongGuesses });
      }
    }
  }, [guessedLetters, quoteData, dispatch]);

  const handleReset = () => {
    dispatch(resetGame());
    setGameStartTime(Date.now());

    // Re-fetch
    onResolve((data) => {
      console.log("New quote loaded:", data);
    });
    onReject((error) => {
      console.error("Failed to load new quote:", error);
    });
  };

  useEffect(() => {
    setGameStartTime(Date.now());
  }, []);

  if (status === "pending")
    return <div className="text-center p-4">Pending...</div>;
  if (error)
    return (
      <div className="text-center p-4 text-red-500">Error loading quote</div>
    );
  console.log("qute", quoteData);
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h2 className="text-2xl mb-8">
        Player : <span className="font-bold">{userName}</span>
      </h2>

      <div className="mb-12 ">
        <SelectDropDown
          setSelectedHook={setSelectedHook}
          selectedHook={selectedHook}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Errors: <span className="text-red-500">{wrongGuesses}/6</span>
        </h2>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          New Game / Reset
        </button>
      </div>

      <div className="my-8">
        <MaskedQuoteText
          base={quoteData?.content || ""}
          revealed={new Set(guessedLetters)}
        />
        {quoteData && (
          <>
            <p className="text-gray-600 italic">- {quoteData?.author}</p>
            <p className="text-gray-600 italic">length: {quoteData?.length}</p>
          </>
        )}
      </div>

      {(gameOver || gameWon) && (
        <div className="my-6 p-6 bg-gray-100 rounded-lg">
          <h2
            className={`text-2xl font-bold ${
              gameWon ? "text-green-600" : "text-red-600"
            }`}
          >
            {gameWon ? "You Won!" : "Game Over!"}
          </h2>

          {gameWon && (
            <button
              className="text-xl font-bold !bg-green-600 mt-4"
              onClick={() => {
                dispatch(resetGame()), navigate("/score");
              }}
            >
              Show Score
            </button>
          )}

          {gameOver && (
            <p className="mt-2 text-gray-700">
              The quote was: {quoteData?.content}
            </p>
          )}
        </div>
      )}

      <KeyBoard
        handleGuess={handleGuess}
        guessedLetters={guessedLetters}
        gameOver={gameOver}
        gameWon={gameWon}
      />
    </div>
  );
};

export default Game;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  userName: string;
  guessedLetters: string[];
  wrongGuesses: number;
  gameOver: boolean;
  gameWon: boolean;
}

const initialState: GameState = {
  userName: "",
  guessedLetters: [],
  wrongGuesses: 0,
  gameOver: false,
  gameWon: false,
};

const initialGameState = (userName: string): GameState => ({
  userName,
  guessedLetters: [],
  wrongGuesses: 0,
  gameOver: false,
  gameWon: false,
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },

    guessLetter: (state, action: PayloadAction<string>) => {
      if (!state.guessedLetters.includes(action.payload)) {
        state.guessedLetters.push(action.payload);
      }
    },
    incrementWrongGuesses: (state) => {
      state.wrongGuesses += 1;
      if (state.wrongGuesses >= 6) {
        state.gameOver = true;
      }
    },
    setGameWon: (state) => {
      state.gameWon = true;
    },
    resetGame: (state) => initialGameState(state.userName),
  },
});

export const {
  setUserName,
  guessLetter,
  incrementWrongGuesses,
  setGameWon,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;

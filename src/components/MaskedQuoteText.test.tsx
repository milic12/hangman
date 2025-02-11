/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MaskedQuoteText from "./MaskedQuoteText";

describe("MaskedQuoteText", () => {
  it("renders masked text with revealed letters correctly", () => {
    const guessedLetters = new Set(["a", "i", "t"]);
    const quote = "This is a test.";

    render(<MaskedQuoteText base={quote} revealed={guessedLetters} />);

    expect(
      screen.getByText("T_i_ i_ a t__t.", { exact: true })
    ).toBeInTheDocument();
  });

  it("preserves special characters", () => {
    const guessedLetters = new Set(["e"]);
    const quote = "Hello!";

    render(<MaskedQuoteText base={quote} revealed={guessedLetters} />);

    expect(screen.getByText("_e___!", { exact: true })).toBeInTheDocument();
  });

  it("handles empty revealed set", () => {
    const guessedLetters = new Set<string>();
    const quote = "Test";

    render(<MaskedQuoteText base={quote} revealed={guessedLetters} />);

    expect(screen.getByText("____")).toBeInTheDocument();
  });
});

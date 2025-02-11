interface MaskedQuoteTextProps {
  base: string;
  revealed: Set<string>;
}

const MaskedQuoteText = ({ base, revealed }: MaskedQuoteTextProps) => {
  const maskedText = base
    .split("")
    .map((char: string) => {
      if (!/[a-zA-Z]/.test(char)) return char;
      return revealed.has(char.toLowerCase()) ? char : "_";
    })
    .join("")
    .split(" ")
    .join("   ");

  return (
    <p className="text-4xl font-mono tracking-widest mb-4">{maskedText}</p>
  );
};

export default MaskedQuoteText;

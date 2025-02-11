export const calculateUniqueCharacters = (text: string): number => {
  return new Set(text.toLowerCase().replace(/[^a-z]/g, "")).size;
};

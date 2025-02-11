import { Quote } from "../types";

const STORAGE_KEY = "cached_quotes";

export const getStoredQuotes = (): Quote[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const storeQuote = (quote: Quote) => {
  const quotes = getStoredQuotes();
  if (!quotes.some((q) => q._id === quote._id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...quotes, quote]));
  }
};

export const getRandomStoredQuote = (): Quote | null => {
  const quotes = getStoredQuotes();
  return quotes.length > 0
    ? quotes[Math.floor(Math.random() * quotes.length)]
    : null;
};

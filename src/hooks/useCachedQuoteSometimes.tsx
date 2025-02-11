import { useState, useCallback, useEffect } from "react";
import { Quote, QuoteStatus, UseQuoteReturn } from "../types";
import { getRandomStoredQuote, storeQuote } from "../helpers/cachedQuotes";

export const useCachedQuoteSometimes = (
  quotePromiseFn: () => Promise<Quote>
): UseQuoteReturn => {
  const [quoteData, setQuoteData] = useState<Quote | undefined>(undefined);
  const [status, setStatus] = useState<QuoteStatus>("pending");
  const [error, setError] = useState<Error>();

  const fetchWithFallback = async () => {
    try {
      const quote = await quotePromiseFn();
      storeQuote(quote);
      return quote;
    } catch (err) {
      const fallbackQuote = getRandomStoredQuote();
      if (fallbackQuote) {
        return fallbackQuote;
      }
      throw err;
    }
  };

  useEffect(() => {
    fetchWithFallback()
      .then((data) => {
        setQuoteData(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err as Error);
        setStatus("error");
      });
  }, []);

  const onResolve = useCallback(
    (callback: (data: Quote) => void) => {
      setStatus("pending");
      fetchWithFallback()
        .then((data) => {
          setQuoteData(data);
          setStatus("success");
          callback(data);
        })
        .catch((err) => {
          setError(err as Error);
          setStatus("error");
        });
    },
    [quotePromiseFn]
  );

  const onReject = useCallback(
    (callback: (error: Error) => void) => {
      if (status === "error" && error) {
        callback(error);
      }
    },
    [status, error]
  );

  return {
    quoteData,
    status,
    error,
    onResolve,
    onReject,
  };
};

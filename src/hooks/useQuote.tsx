import { useState, useCallback, useEffect } from "react";
import { Quote, QuoteStatus, UseQuoteReturn } from "../types";

export const useQuote = (
  quotePromiseFn: () => Promise<Quote>
): UseQuoteReturn => {
  const [quoteData, setQuoteData] = useState<Quote | undefined>(undefined);
  const [status, setStatus] = useState<QuoteStatus>("pending");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    quotePromiseFn()
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
      quotePromiseFn()
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

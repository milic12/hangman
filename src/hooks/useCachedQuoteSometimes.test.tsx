/**
 * @jest-environment jsdom
 */

import { renderHook, act, waitFor } from "@testing-library/react";
import { useCachedQuoteSometimes } from "./useCachedQuoteSometimes";
import { getRandomStoredQuote, storeQuote } from "../helpers/cachedQuotes";

// mock the helper functions
jest.mock("../helpers/cachedQuotes", () => ({
  getRandomStoredQuote: jest.fn(),
  storeQuote: jest.fn(),
}));

describe("useCachedQuoteSometimes", () => {
  const mockQuote = { id: "1", text: "Test quote", author: "Test Author" };
  const mockError = new Error("Failed to fetch quote");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and store a quote successfully", async () => {
    const quotePromiseFn = jest.fn().mockResolvedValue(mockQuote);

    const { result } = renderHook(() =>
      useCachedQuoteSometimes(quotePromiseFn)
    );

    expect(result.current.status).toBe("pending");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.quoteData).toEqual(mockQuote);
    expect(storeQuote).toHaveBeenCalledWith(mockQuote);
  });

  it("should use fallback quote when fetch fails and cached quote exists", async () => {
    const quotePromiseFn = jest.fn().mockRejectedValue(mockError);
    const fallbackQuote = {
      id: "2",
      text: "Fallback quote",
      author: "Fallback Author",
    };
    (getRandomStoredQuote as jest.Mock).mockReturnValue(fallbackQuote);

    const { result } = renderHook(() =>
      useCachedQuoteSometimes(quotePromiseFn)
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.quoteData).toEqual(fallbackQuote);
    expect(getRandomStoredQuote).toHaveBeenCalled();
  });

  it("should handle onResolve callback correctly", async () => {
    const quotePromiseFn = jest.fn().mockResolvedValue(mockQuote);
    const onResolveCallback = jest.fn();

    const { result } = renderHook(() =>
      useCachedQuoteSometimes(quotePromiseFn)
    );

    await waitFor(() => {
      act(() => {
        result.current.onResolve(onResolveCallback);
      });
    });

    await waitFor(() => {
      expect(onResolveCallback).toHaveBeenCalledWith(mockQuote);
    });

    expect(result.current.status).toBe("success");
    expect(result.current.quoteData).toEqual(mockQuote);
  });

  it("should handle onReject callback correctly", async () => {
    const quotePromiseFn = jest.fn().mockRejectedValue(mockError);
    (getRandomStoredQuote as jest.Mock).mockReturnValue(null);
    const onRejectCallback = jest.fn();

    const { result } = renderHook(() =>
      useCachedQuoteSometimes(quotePromiseFn)
    );

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    act(() => {
      result.current.onReject(onRejectCallback);
    });

    expect(onRejectCallback).toHaveBeenCalledWith(mockError);
  });
});

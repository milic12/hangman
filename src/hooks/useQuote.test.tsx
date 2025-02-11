/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { useQuote } from "./useQuote";

describe("useQuote", () => {
  const mockQuote = {
    _id: "123",
    content: "Test quote",
    author: "Test Author",
    tags: ["test"],
    authorSlug: "test-author",
    length: 10,
    dateAdded: "2024-01-01",
    dateModified: "2024-01-01",
  };

  it("should be successful quote fetch", async () => {
    const mockPromise = jest.fn().mockResolvedValue(mockQuote);
    const { result } = renderHook(() => useQuote(mockPromise));

    // initial state
    expect(result.current.status).toBe("pending");
    expect(result.current.quoteData).toBeUndefined();
    expect(result.current.error).toBeUndefined();

    // promise resolve
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.status).toBe("success");
    expect(result.current.quoteData).toEqual(mockQuote);
    expect(result.current.error).toBeUndefined();
  });

  it("should be failed quote fetch", async () => {
    const mockError = new Error("Failed to fetch quote");
    const mockPromise = jest.fn().mockRejectedValue(mockError);
    const { result } = renderHook(() => useQuote(mockPromise));

    // promise to reject
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.status).toBe("error");
    expect(result.current.quoteData).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
  });

  it("should handle onResolve callback", async () => {
    const mockPromise = jest.fn().mockResolvedValue(mockQuote);
    const onResolveMock = jest.fn();

    const { result } = renderHook(() => useQuote(mockPromise));

    // wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    // trigger onResolve
    await act(async () => {
      result.current.onResolve(onResolveMock);
      await Promise.resolve();
    });

    expect(onResolveMock).toHaveBeenCalledWith(mockQuote);
    expect(result.current.status).toBe("success");
    expect(result.current.quoteData).toEqual(mockQuote);
  });

  it("should handle onReject callback", async () => {
    const mockError = new Error("Failed to fetch quote");
    const mockPromise = jest.fn().mockRejectedValue(mockError);
    const onRejectMock = jest.fn();

    const { result } = renderHook(() => useQuote(mockPromise));

    // wait for the promise to reject
    await act(async () => {
      await Promise.resolve();
    });

    // trigger onReject
    act(() => {
      result.current.onReject(onRejectMock);
    });

    expect(onRejectMock).toHaveBeenCalledWith(mockError);
    expect(result.current.status).toBe("error");
    expect(result.current.error).toEqual(mockError);
  });
});

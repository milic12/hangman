import { calculateScore } from "./calculateScore";

describe("calculateScore", () => {
  test("solutions with fewer errors score higher", () => {
    const score1 = calculateScore(10, 5, 0, 30000);
    const score2 = calculateScore(10, 5, 1, 30000);
    const score3 = calculateScore(10, 5, 2, 30000);

    expect(score1).toBeGreaterThan(score2);
    expect(score2).toBeGreaterThan(score3);
  });

  test("solutions with more unique letters score higher", () => {
    const score1 = calculateScore(10, 8, 1, 30000);
    const score2 = calculateScore(10, 5, 1, 30000);

    expect(score1).toBeGreaterThan(score2);
  });

  test("longer solutions score higher", () => {
    const score1 = calculateScore(15, 5, 1, 30000);
    const score2 = calculateScore(10, 5, 1, 30000);

    expect(score1).toBeGreaterThan(score2);
  });

  test("faster solutions score higher", () => {
    const score1 = calculateScore(10, 5, 1, 20000); // 20 seconds
    const score2 = calculateScore(10, 5, 1, 30000); // 30 seconds

    expect(score1).toBeGreaterThan(score2);
  });

  describe("edge cases", () => {
    test("handles zero errors", () => {
      expect(calculateScore(10, 5, 0, 30000)).toBeGreaterThan(0);
    });

    test("handles very long solving times", () => {
      expect(calculateScore(10, 5, 1, 3600000)).toBeGreaterThan(0); // 1 hour
    });

    test("handles very short solving times", () => {
      expect(calculateScore(10, 5, 1, 1000)).toBeGreaterThan(0); // 1 second
    });

    test("handles minimum inputs", () => {
      expect(calculateScore(1, 1, 0, 1000)).toBeGreaterThan(0);
    });

    test("never returns negative scores", () => {
      expect(calculateScore(0, 0, 100, 3600000)).toBe(0);
    });
  });
});

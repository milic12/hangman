export const calculateScore = (
  L: number,
  U: number,
  E: number,
  T: number
): number => {
  const complexityScore = L * U;

  const errors = 1 / (E + 1);

  const timeFactorMinutes = T / 60000;

  const time = 1 / (timeFactorMinutes + 0.1);

  const finalScore = complexityScore * errors * time;

  return Math.max(Math.round(finalScore * 100), 0);
};

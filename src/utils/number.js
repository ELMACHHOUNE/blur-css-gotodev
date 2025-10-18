export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const round = (value, precision = 2) =>
  Math.round(value * 10 ** precision) / 10 ** precision;

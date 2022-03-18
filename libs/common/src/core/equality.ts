export const structEq =
  <T>(first: T) =>
  (last: T) =>
    JSON.stringify(first) === JSON.stringify(last)

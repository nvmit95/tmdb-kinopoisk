export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

export const roundTo = (n: number, digits: number) => {
  const p = 10 ** digits
  return Math.round(n * p) / p
}

/** UI rating 0..100 → TMDB vote_average 0..10 */
export const uiToTmdbVote = (uiValue: number) => roundTo(uiValue / 10, 1)

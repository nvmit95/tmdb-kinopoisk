import type { Theme } from "@mui/material/styles"

export const moviePosterRatingBadgeBgColor = (
  theme: Theme,
  vote: number | undefined,
): string => {
  const c = theme.palette.customColors
  if (vote == null || Number.isNaN(vote)) return c.moviePosterRatingUnknown
  if (vote === 0 || vote < 6) return c.moviePosterRatingLow
  // Зелёный с 7.0 включительно; жёлтый — от 6 до 7 (не включая 7).
  if (vote >= 7) return c.moviePosterRatingHigh
  return c.moviePosterRatingMid
}

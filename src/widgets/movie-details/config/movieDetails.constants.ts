import { pxToRem } from "@/shared/theme"

export const MOVIE_DETAILS_SPACING = pxToRem(24)

/** Вертикальный зазор между основными блоками (шапка, Cast, похожие) */
const MOVIE_DETAILS_MAIN_BLOCK_GAP = pxToRem(32)

/** Общая сетка страницы `MovieDetails`: секции, заголовки, похожие фильмы */
export const MOVIE_DETAILS_SX = {
  sectionWrapper: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: MOVIE_DETAILS_MAIN_BLOCK_GAP,
    width: "100%",
  },
  sectionStack: {
    gap: MOVIE_DETAILS_SPACING,
    width: "100%",
  },
  sectionTitle: {
    m: 0,
    fontSize: pxToRem(24),
    fontWeight: 600,
    color: "text.primary",
  },
  genresLabel: {
    m: 0,
    width: "100%",
    fontSize: pxToRem(20),
    fontWeight: 600,
    color: "text.primary",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: MOVIE_DETAILS_SPACING,
  },
}

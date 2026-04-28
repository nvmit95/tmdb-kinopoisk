import type { CSSProperties } from "react"
import type { Theme } from "@mui/material/styles"
import { moviePosterRatingBadgeBgColor } from "../model/moviePosterRating"
import { pxToRem } from "@/shared/theme"

export const TMDB_IMAGE_W500 = "https://image.tmdb.org/t/p/w500"

/** Постер на странице фильма (крупнее, чем в сетке карточек). */
export const TMDB_IMAGE_W780 = "https://image.tmdb.org/t/p/w780"

export const MOVIE_POSTER_PLACEHOLDER =
  "https://placehold.co/500x750/0f172a/94a3b8/png?text=No+poster"

export const MOVIE_POSTER_CARD_LAYOUT_SX = {
  gridItem: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: pxToRem(12),
  },
  posterSurface: {
    borderRadius: pxToRem(16),
    overflow: "hidden",
    aspectRatio: "2 / 3",
    bgcolor: "action.hover",
  },
} as const

/**
 * Метрики заголовка под `MoviePosterCard` (размер/интерлиньяж совпадают с `moviePosterCardTitleSx`).
 * Держим здесь, чтобы `MoviePosterCardSkeleton` мог считать высоту без "парсинга" theme.
 */
export const MOVIE_POSTER_CARD_TITLE_METRICS = {
  /** Используем px-значение, чтобы легко считать высоту скелетона без парсинга rem-строк */
  fontSizePx: 16,
  lineHeight: 1.5,
} as const

export const MOVIE_POSTER_CARD_TITLE_LINE_CLAMP = 2

export const getMoviePosterCardSkeletonTitleHeightPx = () => {
  return MOVIE_POSTER_CARD_TITLE_METRICS.fontSizePx *
    MOVIE_POSTER_CARD_TITLE_METRICS.lineHeight *
    MOVIE_POSTER_CARD_TITLE_LINE_CLAMP
}

export const MOVIE_POSTER_CARD_SKELETON_SX = {
  poster: {
    width: "100%",
    height: "100%",
  },
} as const

const MOVIE_POSTER_CARD_SKELETON_TITLE_BASE_SX = {
  width: "100%",
  borderRadius: pxToRem(10),
} as const

export const moviePosterCardSkeletonTitleSx = (heightPx: number) => ({
  ...MOVIE_POSTER_CARD_SKELETON_TITLE_BASE_SX,
  height: heightPx,
})

export const MOVIE_POSTER_CARD_LINK_STYLE: CSSProperties = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
  minWidth: 0,
}

export const MOVIE_POSTER_CARD_POSTER_LINK_STYLE: CSSProperties = {
  ...MOVIE_POSTER_CARD_LINK_STYLE,
  display: "block",
  height: "100%",
}

export const MOVIE_POSTER_CARD_POSTER_IMAGE_SX = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const

export const MOVIE_POSTER_CARD_POSTER_FRAME_SX = {
  position: "relative",
  width: "100%",
  "&:hover .movie-poster-favorite-btn": {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
  },
} as const

export const MOVIE_POSTER_CARD_POSTER_CONTENT_SX = {
  position: "relative",
  height: "100%",
} as const

export const moviePosterCardRatingBadgeSx = (
  theme: Theme,
  voteAverage: number | undefined,
) =>
  ({
    position: "absolute",
    bottom: pxToRem(12),
    right: pxToRem(12),
    width: pxToRem(40),
    height: pxToRem(40),
    borderRadius: "50%",
    bgcolor: moviePosterRatingBadgeBgColor(theme, voteAverage),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.palette.customColors.moviePosterRatingBadgeShadow,
  }) as const

export const moviePosterCardRatingBadgeTextSx = (theme: Theme) =>
  ({
    color: theme.palette.customColors.moviePosterRatingBadgeContent,
    fontSize: pxToRem(14),
    fontWeight: 600,
    lineHeight: 1,
  }) as const

export const moviePosterCardFavoriteButtonSx = (theme: Theme, isFavorite: boolean) =>
  ({
    position: "absolute",
    top: pxToRem(12),
    right: pxToRem(12),
    zIndex: 2,
    color: "transparent",
    bgcolor: theme.palette.customColors.moviePosterFavoriteScrim,
    width: pxToRem(40),
    height: pxToRem(40),
    borderRadius: "50%",
    ...(!isFavorite
      ? {
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
        }
      : {
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
        }),
    transition: "opacity 0.2s ease, visibility 0.2s ease, background-color 0.2s ease",
    "&:hover": {
      bgcolor: theme.palette.customColors.accentBlue,
    },
    "&:focus-visible": {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "auto",
      outline: `2px solid ${theme.palette.customColors.accentBlue}`,
      outlineOffset: 2,
    },
  }) as const

export const moviePosterCardFavoriteHeartSx = (theme: Theme) =>
  ({
    color: theme.palette.customColors.moviePosterFavoriteHeart,
  }) as const

export const moviePosterCardFavoriteHeartOutlineSx = (theme: Theme) =>
  ({
    color: theme.palette.customColors.moviePosterFavoriteHeartOutline,
  }) as const

export const moviePosterCardTitleSx = () => ({
  fontWeight: 500,
  fontSize: pxToRem(MOVIE_POSTER_CARD_TITLE_METRICS.fontSizePx),
  lineHeight: MOVIE_POSTER_CARD_TITLE_METRICS.lineHeight,
  color: "text.primary",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: MOVIE_POSTER_CARD_TITLE_LINE_CLAMP,
  wordBreak: "break-word",
})


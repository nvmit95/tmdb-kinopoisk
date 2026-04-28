import { MOVIE_DETAILS_SX } from "@/widgets/movie-details/config/movieDetails.constants"
import { FILTERED_MOVIES_SIDEBAR_SX } from "@/widgets/filtered-movies/ui/FilteredMoviesSidebar.styles"
import { PILL_BORDER_RADIUS, pxToRem } from "@/shared/theme"
import {
  moviePosterCardRatingBadgeSx,
  moviePosterCardRatingBadgeTextSx,
} from "@/widgets/movie-poster-card/ui/MoviePosterCard.styles"
import { alpha } from "@mui/material/styles"
import type { Theme } from "@mui/material/styles"

const POSTER_FRAME_RADIUS = pxToRem(16)

/** На тёмном фоне чёрная тень не видна — светлое свечение по контуру; в light — мягкая тёмная тень */
const getMovieHeaderPosterBoxShadow = (theme: Theme) => {
  const w = theme.palette.common.white
  if (theme.palette.mode === "dark") {
    return [
      `0 0 0 1px ${alpha(w, 0.06)}`,
      `0 0 ${pxToRem(16)} ${pxToRem(2)} ${alpha(w, 0.1)}`,
      `0 0 ${pxToRem(28)} ${pxToRem(6)} ${alpha(w, 0.05)}`,
    ].join(", ")
  }
  return [
    `0 0 0 1px ${alpha(theme.palette.common.black, 0.04)}`,
    `0 ${pxToRem(10)} ${pxToRem(24)} ${alpha(theme.palette.common.black, 0.08)}`,
  ].join(", ")
}

export const MOVIE_HEADER_POSTER = {
  widthPx: 280,
  heightPx: 420,
} as const

export const MOVIE_HEADER_SX = {
  root: {
    width: "100%",
    columnGap: 4,
    rowGap: 3,
  },
  /** Снаружи: тень (без overflow — иначе тень обрезается) */
  posterFrameOuter: {
    width: pxToRem(MOVIE_HEADER_POSTER.widthPx),
    maxWidth: "100%",
    height: pxToRem(MOVIE_HEADER_POSTER.heightPx),
    flexShrink: 0,
    alignSelf: { xs: "center", md: "flex-start" },
    borderRadius: POSTER_FRAME_RADIUS,
    boxSizing: "border-box",
  },
  /** Внутри: обрезка постера и фон-заглушка */
  posterFrameInner: {
    width: "100%",
    height: "100%",
    borderRadius: POSTER_FRAME_RADIUS,
    overflow: "hidden",
    bgcolor: "action.hover",
  },
  posterImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contentColumn: {
    gap: pxToRem(24),
    flex: 1,
    minWidth: 0,
    width: "100%",
  },
  /** Заголовок (h1) и строка «Release year / rating / runtime» */
  titleMetaBlock: {
    gap: pxToRem(12),
    width: "100%",
  },
  titleRow: {
    columnGap: pxToRem(16),
    rowGap: pxToRem(8),
    width: "100%",
  },
  title: {
    m: 0,
    fontSize: pxToRem(36),
    fontWeight: 700,
    lineHeight: 1.2,
    flex: 1,
    minWidth: 0,
  },
  backButton: (theme: Theme) => {
    const border = theme.palette.customColors.movieDetails.headerBackButtonBorder
    return {
      flexShrink: 0,
      alignSelf: "flex-start",
      textTransform: "none",
      fontSize: pxToRem(14),
      fontWeight: 600,
      px: pxToRem(12),
      py: pxToRem(6),
      borderRadius: PILL_BORDER_RADIUS,
      color: theme.palette.text.primary,
      bgcolor: theme.palette.background.default,
      borderColor: border,
      boxShadow: "none",
      "&:hover": {
        bgcolor: theme.palette.background.default,
        borderColor: border,
        boxShadow: "none",
        opacity: 0.9,
      },
    }
  },
  metaRow: {
    columnGap: pxToRem(16),
    rowGap: pxToRem(8),
  },
  genresStack: {
    gap: pxToRem(12),
    width: "100%",
  },
  /** Та же сетка, что у чипов жанров в сайдбаре фильтров (без кросс-импорта в JSX) */
  genrePillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: pxToRem(8),
  },
}

export const getMovieHeaderGenresLabelSx = (theme: Theme) => ({
  ...MOVIE_DETAILS_SX.genresLabel,
  color:
    theme.palette.mode === "light"
      ? theme.palette.customColors.movieDetails.genreTextLight
      : "text.primary",
})

export const getMovieHeaderMetaLineSx = (theme: Theme) => ({
  m: 0,
  fontWeight: 500,
  color:
    theme.palette.mode === "light"
      ? theme.palette.customColors.movieDetails.metaTextLight
      : theme.palette.customColors.movieDetails.metaTextMuted,
})

/** Текст оценки в шапке: та же гамма, что на карточке, но font-weight 500 как у мета-строк */
export const getMovieHeaderRatingBadgeTextSx = (theme: Theme) => ({
  ...moviePosterCardRatingBadgeTextSx(theme),
  fontWeight: 500,
})

export const getMovieHeaderOverviewSx = (theme: Theme) => ({
  m: 0,
  fontSize: pxToRem(18),
  lineHeight: 1.6,
  whiteSpace: "pre-line",
  color:
    theme.palette.mode === "light"
      ? theme.palette.customColors.movieDetails.overviewTextLight
      : theme.palette.customColors.movieDetails.overviewText,
})

export const getMovieHeaderPosterFrameSx = (theme: Theme) => ({
  ...MOVIE_HEADER_SX.posterFrameOuter,
  boxShadow: getMovieHeaderPosterBoxShadow(theme),
})

export const getMovieHeaderRatingBadgeBoxSx = (
  theme: Theme,
  voteAverage: number | undefined,
) => ({
  ...moviePosterCardRatingBadgeSx(theme, voteAverage),
  position: "relative",
  bottom: "auto",
  right: "auto",
})

export const getMovieHeaderGenrePillSx = (theme: Theme) => {
  if (theme.palette.mode === "light") {
    const { genrePillLightBg, genrePillLightBgHover, genreTextLight } =
      theme.palette.customColors.movieDetails
    return {
      borderRadius: PILL_BORDER_RADIUS,
      textTransform: "none" as const,
      minWidth: "auto" as const,
      fontWeight: 600,
      fontSize: pxToRem(14),
      px: pxToRem(12),
      py: pxToRem(6),
      bgcolor: genrePillLightBg,
      color: genreTextLight,
      boxSizing: "border-box" as const,
      border: `${pxToRem(1)} solid ${genrePillLightBg}`,
      boxShadow: "none",
      display: "inline-flex" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      cursor: "default" as const,
      "&:hover": {
        bgcolor: genrePillLightBgHover,
        borderColor: genrePillLightBgHover,
        opacity: 0.95,
      },
    }
  }
  return {
    ...FILTERED_MOVIES_SIDEBAR_SX.genreButton(theme, false),
    borderStyle: "solid" as const,
    boxSizing: "border-box" as const,
    display: "inline-flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    cursor: "default" as const,
  }
}

export const getMovieHeaderSkeletonBackButtonPlaceholderSx = (theme: Theme) => ({
  border: `1px solid ${theme.palette.customColors.movieDetails.headerBackButtonBorder}`,
  borderRadius: PILL_BORDER_RADIUS,
})

export const MOVIE_HEADER_SKELETON_SX = {
  posterFill: {
    width: "100%",
    height: "100%",
    borderRadius: POSTER_FRAME_RADIUS,
  },
  titleSkeleton: {
    flex: 1,
    minWidth: 120,
  },
  genrePill: {
    borderRadius: PILL_BORDER_RADIUS,
  },
} as const


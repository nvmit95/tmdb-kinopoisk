import { pxToRem } from "@/shared/theme"

import { MOVIE_DETAILS_SPACING } from "../../config/movieDetails.constants"

/** База для кадров актёров (`profile_path`), см. https://developer.themoviedb.org/reference/movie-credits */
export const TMDB_PROFILE_W185 = "https://image.tmdb.org/t/p/w185"

/** Когда у актёра нет `profile_path` или картинка не загрузилась (квадрат под круг 160×160) */
export const CAST_PHOTO_PLACEHOLDER =
  "https://placehold.co/160x160/0f172a/94a3b8/png?text=No+photo"

/** Круглый портрет актёра в блоке Cast */
export const CAST_PHOTO_SIZE_PX = 160

export const MOVIE_CAST_SX = {
  castName: {
    m: 0,
    lineHeight: 1.3,
    textAlign: "center",
    width: "100%",
    fontSize: pxToRem(16),
    fontWeight: 600,
    color: "text.primary",
  },
  castRole: {
    m: 0,
    lineHeight: 1.3,
    textAlign: "center",
    width: "100%",
    display: "block",
    fontSize: pxToRem(14),
    color: "text.secondary",
  },
  castCardStack: {
    width: "100%",
    maxWidth: pxToRem(CAST_PHOTO_SIZE_PX),
    minWidth: 0,
    gap: pxToRem(12),
  },
  castCardPhoto: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: "50%",
    flexShrink: 0,
    bgcolor: "action.hover",
  },
  castCardPhotoSkeleton: {
    width: "100%",
    maxWidth: pxToRem(CAST_PHOTO_SIZE_PX),
    height: "auto",
    aspectRatio: "1 / 1",
    flexShrink: 0,
  },
  castCardsRow: {
    display: "grid",
    width: "100%",
    gap: MOVIE_DETAILS_SPACING,
    gridTemplateColumns: {
      xs: "repeat(2, minmax(0, 1fr))",
      sm: "repeat(3, minmax(0, 1fr))",
      md: "repeat(6, minmax(0, 1fr))",
    },
    justifyItems: "center",
    alignItems: "start",
  },
  castCardTextStack: {
    width: "100%",
    gap: pxToRem(6),
  },
}


import { alpha, createTheme } from "@mui/material/styles"
import type { ThemeMode } from "@/shared/types/types"
import { createAppComponents } from "@/shared/theme/components"
import { APP_TYPOGRAPHY } from "@/shared/theme/typography"
import { getThemeTokens } from "@/shared/theme/tokens"

interface CustomBackground {
  header: string
  footer: string
}

/** Цвета страницы `MovieDetails` (шапка, мета, жанры) — `palette.customColors.movieDetails` */
export interface MovieDetailsThemeColors {
  /** Кнопка «Back»: цвет border */
  headerBackButtonBorder: string
  /** Тёмная тема: «Release year» / «Runtime» */
  metaTextMuted: string
  /** Светлая тема: «Release year» / «Runtime» */
  metaTextLight: string
  /** Тёмная тема: описание */
  overviewText: string
  /** Светлая тема: описание */
  overviewTextLight: string
  /** Светлая тема: подпись «Genres» и текст в плашках жанров */
  genreTextLight: string
  /** Светлая тема: плашки жанров; в тёмной — `genreButton` сайдбара */
  genrePillLightBg: string
  genrePillLightBgHover: string
}

interface CustomColors {
  /** Синий акцент для CTA, фокуса полей, hover на иконках и т.п. */
  accentBlue: string
  /** Hover-цвет для синих акцентных кнопок (CTA) */
  accentBlueHover: string
  /** Base control colors reused across app (inputs, selects, chips, menus). */
  controlBorder: string
  controlBg: string
  controlText: string
  /** Subtle separators / slider rails on dark panels */
  controlMutedBg: string
  /** Menu item states */
  controlMenuItemSelectedBg: string
  controlMenuItemHoverBg: string
  /** Focus ring around controls (matches accentBlue) */
  controlFocusRing: string

  /** Legacy (kept for backwards-compat) */
  welcomeSearchInputBorder: string
  welcomeSearchInputBg: string

  /** Movie poster card: scrim под кнопкой избранного на постере */
  moviePosterFavoriteScrim: string
  /** Movie poster card: “пустой” рейтинг / нет данных */
  moviePosterRatingUnknown: string
  /** Movie poster card: низкий рейтинг */
  moviePosterRatingLow: string
  /** Movie poster card: средний рейтинг */
  moviePosterRatingMid: string
  /** Movie poster card: высокий рейтинг */
  moviePosterRatingHigh: string
  /** Movie poster card: тень круглого бейджа рейтинга */
  moviePosterRatingBadgeShadow: string
  /** Movie poster card: текст/иконки на бейдже рейтинга */
  moviePosterRatingBadgeContent: string
  /** Movie poster card: активное “сердце” избранного */
  moviePosterFavoriteHeart: string
  /** Movie poster card: контур “сердца”, когда не в избранном */
  moviePosterFavoriteHeartOutline: string

  /** Страница деталей фильма: шапка, мета, жанры */
  movieDetails: MovieDetailsThemeColors
}

declare module "@mui/material/styles" {
  interface Palette {
    customBackground: CustomBackground
    customColors: CustomColors
  }
  interface PaletteOptions {
    customBackground?: Partial<CustomBackground>
    customColors?: Partial<CustomColors>
  }
}

export const getTheme = (themeMode: ThemeMode) => {
  const isLight = themeMode === "light"
  const tokens = getThemeTokens(themeMode)

  return createTheme({
    components: createAppComponents(tokens),
    typography: APP_TYPOGRAPHY,
    palette: {
      mode: themeMode,
      primary: { main: "#4f46e5" },
      warning: { main: "#f59e0b" },
      background: {
        default: isLight ? "#FFFFFF" : "#0B1120",
      },
      customBackground: {
        header: tokens.headerBg,
        footer: tokens.footerBg,
      },
      customColors: {
        accentBlue: tokens.accentBlue,
        accentBlueHover: "#1d4ed8",
        controlBorder: tokens.controlBorder,
        controlBg: tokens.controlBg,
        controlText: tokens.controlText,
        controlMutedBg: tokens.controlMutedBg,
        controlFocusRing: "0 0 0 2px rgb(37 99 235 / .2)",

        welcomeSearchInputBorder: tokens.controlBorder,
        welcomeSearchInputBg: tokens.controlBg,
        moviePosterFavoriteScrim: "#0f172a99",
        moviePosterRatingUnknown: "#64748b",
        moviePosterRatingLow: "#e53935",
        moviePosterRatingMid: "#facc15",
        moviePosterRatingHigh: "#22c55e",
        moviePosterRatingBadgeShadow: "0 2px 8px rgba(0,0,0,0.35)",
        /** Цифра на круглом бейдже: светлая тема — #111827; тёмная — белая на цветных кружках */
        moviePosterRatingBadgeContent: isLight ? "#111827" : "#ffffff",
        moviePosterFavoriteHeart: "#FFC107",
        moviePosterFavoriteHeartOutline: "#ffffff",
        movieDetails: tokens.movieDetails,
      },
      divider: isLight ? "#E5E7EB" : "#374151",
      text: {
        secondary: isLight ? "#4b5563" : "#94a3b8",
      },
      action: {
        selected: isLight ? alpha("#000000", 0.06) : alpha("#ffffff", 0.1),
      },
    },
  })
}

export function applyThemeToDocument(themeMode: ThemeMode) {
  if (typeof document === "undefined") return

  const theme = getTheme(themeMode)
  const bg = theme.palette.background.default

  document.documentElement.style.backgroundColor = bg
  document.documentElement.style.colorScheme = themeMode === "light" ? "light" : "dark"

  if (document.body) {
    document.body.style.backgroundColor = bg
  }
}

import type { ThemeMode } from "@/shared/types/types"

export type ThemeTokens = {
  accentBlue: string
  headerBg: string
  footerBg: string
  controlBorder: string
  controlBg: string
  controlText: string
  controlMutedBg: string
  movieDetails: {
    headerBackButtonBorder: string
    metaTextMuted: string
    metaTextLight: string
    overviewText: string
    overviewTextLight: string
    genreTextLight: string
    genrePillLightBg: string
    genrePillLightBgHover: string
  }
}

export const getThemeTokens = (mode: ThemeMode): ThemeTokens => {
  const isLight = mode === "light"

  return {
    accentBlue: "#2563eb",
    // Primary stays as-is (#4f46e5) — used in Header hover/LinearProgress.
    headerBg: isLight ? "#F3F4F6" : "#141C2C",
    footerBg: isLight ? "#F9FAFB" : "#0F172A",
    controlBorder: "#324061",
    controlBg: isLight ? "#ffffff" : "#1F2B40",
    controlText: isLight ? "#0f172a" : "#e2e8f0",
    controlMutedBg: isLight ? "#f1f5f9" : "#1F2B40",
    movieDetails: {
      headerBackButtonBorder: "#27354f",
      metaTextMuted: "#94a3b8",
      metaTextLight: "#4b5563",
      overviewText: "#cbd5f5",
      overviewTextLight: "#374151",
      genreTextLight: "#1f2937",
      genrePillLightBg: "#e5e7eb",
      genrePillLightBgHover: "#d1d5db",
    },
  }
}


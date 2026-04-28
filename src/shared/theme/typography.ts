import { pxToRem } from "@/shared/theme/utils"

export const APP_TYPOGRAPHY = {
  fontFamily: "var(--app-font-family), sans-serif",
  h1: {
    fontSize: pxToRem(48),
    fontWeight: 800,
    lineHeight: 1,
    textTransform: "uppercase",
  },
  subtitle1: {
    fontSize: pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.2,
  },
} as const


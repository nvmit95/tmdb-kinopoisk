import { pxToRem } from "@/shared/theme"

export const PAGE_LAYOUT_SX = {
  root: {
    bgcolor: "background.default",
    py: pxToRem(24),
    minHeight: "50vh",
  },
  container: {
    px: pxToRem(24),
  },
  postersGrid: {
    display: "grid",
    gap: pxToRem(24),
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  },
} as const


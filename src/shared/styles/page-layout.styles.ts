import { pxToRem } from "@/shared/theme"

export const PAGE_LAYOUT_SX = {
  root: {
    bgcolor: "background.default",
    py: pxToRem(24),
    minHeight: "50vh",
  },
  container: {
    px: { xs: pxToRem(16), sm: pxToRem(24) },
  },
  postersGrid: {
    display: "grid",
    gap: { xs: pxToRem(16), sm: pxToRem(24) },
    gridTemplateColumns: {
      xs: "repeat(2, minmax(0, 1fr))",
      sm: "repeat(3, minmax(0, 1fr))",
      md: "repeat(4, minmax(0, 1fr))",
      lg: "repeat(5, minmax(0, 1fr))",
    },
  },
} as const

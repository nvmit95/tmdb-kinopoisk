import { PAGE_LAYOUT_SX } from "@/shared/styles"
import { pxToRem } from "@/shared/theme"

export const FAVORITES_PAGE_SX = {
  main: { ...PAGE_LAYOUT_SX.root, py: pxToRem(32) },
  container: { px: 0 },
  rootStack: { gap: pxToRem(24) },
  titleStack: { gap: pxToRem(32) },
  h1: {
    m: 0,
    fontSize: pxToRem(32),
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    m: 0,
    fontSize: pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.3,
  },
  emptyHint: { m: 0 },
  postersGrid: {
    ...PAGE_LAYOUT_SX.postersGrid,
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
  },
} as const


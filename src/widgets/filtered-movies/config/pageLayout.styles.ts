import { pxToRem } from "@/shared/theme"

export const FILTERED_MOVIES_PAGE_LAYOUT_SX = {
  layout: {
    display: "grid",
    gridTemplateColumns: `${pxToRem(294)} 1fr`,
    gap: pxToRem(24),
    alignItems: "start",
  },
} as const

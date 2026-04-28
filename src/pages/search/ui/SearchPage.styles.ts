import { PAGE_LAYOUT_SX } from "@/shared/styles"
import { pxToRem } from "@/shared/theme"

/** Отступы только для Search: без боковых, сверху 32px, снизу 24px. */
export const SEARCH_PAGE_LAYOUT_SX = {
  root: {
    ...PAGE_LAYOUT_SX.root,
    py: 0,
    pt: pxToRem(32),
    pb: pxToRem(24),
  },
  container: {
    ...PAGE_LAYOUT_SX.container,
    px: 0,
  },
} as const

export const SEARCH_PAGE_SX = {
  pageStack: {
    gap: pxToRem(24),
  },
  title: {
    fontWeight: 700,
    textAlign: "left",
    fontSize: pxToRem(28),
    lineHeight: 1.2,
    color: "text.primary",
  },
  resultsFor: {
    fontWeight: 600,
    fontSize: pxToRem(24),
    lineHeight: 1.2,
    color: "text.primary",
  },
  searchRow: {},
  paginationEllipsis: {
    px: pxToRem(6),
    color: "text.secondary",
    fontWeight: 700,
  },
  paginationPageButton: (isActive: boolean) => ({
    minWidth: 44,
    height: 44,
    p: 0,
    borderRadius: 2,
    fontWeight: 700,
    boxShadow: "none",
    border: "1px solid",
    borderColor: isActive ? "primary.main" : "divider",
    bgcolor: isActive ? "primary.main" : "transparent",
    color: isActive ? "primary.contrastText" : "text.primary",
    cursor: "pointer",
    "&:hover": {
      borderColor: "primary.main",
      bgcolor: isActive ? "primary.dark" : "action.hover",
    },
  }),
  paginationWrap: {},
} as const


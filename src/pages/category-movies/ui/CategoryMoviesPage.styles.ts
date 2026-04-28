import type { Theme } from "@mui/material/styles"
import { PILL_BORDER_RADIUS, pxToRem } from "@/shared/theme"

export const CATEGORY_MOVIES_PAGE_SX = {
  // root/container/grid вынесены в shared PAGE_LAYOUT_SX
  tabs: {
    direction: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    sx: { mb: pxToRem(28), gap: pxToRem(12) },
  },
  tabButton: (theme: Theme, isActive: boolean) => ({
    borderRadius: PILL_BORDER_RADIUS,
    textTransform: "none",
    px: pxToRem(20),
    py: pxToRem(8),
    minWidth: "auto",
    fontWeight: 600,
    fontSize: pxToRem(14),
    ...(isActive
      ? {
          color: theme.palette.common.white,
          boxShadow: "none",
        }
      : {
          borderColor:
            theme.palette.mode === "dark"
              ? "transparent"
              : theme.palette.customColors.controlBorder,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.customColors.controlText
              : theme.palette.text.primary,
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.customColors.controlBg
              : theme.palette.background.default,
          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? theme.palette.customColors.controlBg
                : theme.palette.background.default,
            borderColor:
              theme.palette.mode === "dark"
                ? "transparent"
                : theme.palette.customColors.controlBorder,
            color: "primary.main",
            opacity: theme.palette.mode === "dark" ? 0.92 : 0.9,
          },
        }),
  }),
  title: {
    fontWeight: 600,
    mb: pxToRem(24),
    textAlign: "left",
    fontSize: pxToRem(24),
    lineHeight: 1.2,
  },
  paginationWrap: {
    mt: pxToRem(40),
  },
  paginationRow: {
    direction: "row",
    alignItems: "center",
    gap: pxToRem(10),
  },
  ellipsis: {
    px: pxToRem(6),
    color: "text.secondary",
    fontWeight: 700,
    userSelect: "none",
  },
  pageButton: (theme: Theme, isActive: boolean) => ({
    minWidth: pxToRem(44),
    height: pxToRem(44),
    p: 0,
    borderRadius: pxToRem(10),
    fontWeight: 700,
    lineHeight: 1,
    ...(isActive
      ? { boxShadow: "none", color: theme.palette.common.white }
      : {
          bgcolor: "transparent",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.18)"
              : "rgba(15,23,42,0.18)",
          color: theme.palette.text.primary,
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: theme.palette.action.hover,
          },
        }),
  }),
} as const


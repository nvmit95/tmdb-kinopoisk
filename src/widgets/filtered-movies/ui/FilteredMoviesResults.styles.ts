import { pxToRem } from "@/shared/theme"
import type { Theme } from "@mui/material/styles"

export const FILTERED_MOVIES_RESULTS_SX = {
  paginationWrap: {
    mt: pxToRem(40),
  },
  paginationEllipsis: {
    px: 0.75,
    color: "text.secondary",
    fontWeight: 700,
  },
  paginationPageButton: (theme: Theme) => ({
    minWidth: 44,
    height: 44,
    p: 0,
    borderRadius: 2,
    fontWeight: 700,
    boxShadow: "none",
    borderColor: theme.palette.customColors.controlBorder,
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&.MuiButton-contained": {
      border: "1px solid",
      borderColor: theme.palette.customColors.controlBorder,
    },
  }),
} as const


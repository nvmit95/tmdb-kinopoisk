import { Theme } from "@mui/material/styles"
import { PILL_BORDER_RADIUS, pxToRem } from "@/shared/theme"

export const MOVIE_PREVIEW_SECTION_SX = {
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: pxToRem(16),
    mb: pxToRem(24),
    flexWrap: "wrap",
  },
  title: (theme: Theme) => ({
    fontWeight: 600,
    fontSize: pxToRem(24),
    lineHeight: 1.2,
    color: theme.palette.text.primary,
  }),
  viewMoreButton: (theme: Theme) => ({
    borderRadius: PILL_BORDER_RADIUS,
    textTransform: "none",
    px: pxToRem(12),
    py: pxToRem(6),
    minWidth: "auto",
    fontSize: pxToRem(14),
    fontWeight: 600,
    borderColor: theme.palette.customColors.controlBorder,
    color: theme.palette.text.primary,
    "&:hover": {
      bgcolor: theme.palette.action.hover,
      borderColor: theme.palette.customColors.controlBorder,
      color: theme.palette.common.white,
    },
  }),
  grid: {
    display: "grid",
    gap: { xs: pxToRem(16), sm: pxToRem(24) },
    gridTemplateColumns: {
      xs: "repeat(2, minmax(0, 1fr))",
      sm: "repeat(3, minmax(0, 1fr))",
      md: "repeat(4, minmax(0, 1fr))",
      lg: "repeat(6, minmax(0, 1fr))",
    },
  },
}


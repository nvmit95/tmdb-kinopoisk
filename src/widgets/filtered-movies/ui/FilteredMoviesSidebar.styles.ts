import type { Theme } from "@mui/material/styles"
import { PILL_BORDER_RADIUS, pxToRem } from "@/shared/theme"

export const FILTERED_MOVIES_SIDEBAR_SX = {
  sidebar: (theme: Theme) => ({
    bgcolor: theme.palette.customBackground.header,
    color: theme.palette.text.primary,
    backgroundImage: "none",

    border: "none",
    borderRadius: pxToRem(12),
    p: pxToRem(24),

    display: "flex",
    flexDirection: "column",
    gap: pxToRem(40),
  }),
  sidebarTitle: {
    fontWeight: 600,
    fontSize: pxToRem(20),
    lineHeight: 1.2,
  },

  sortLabel: {
    fontWeight: 600,
    fontSize: pxToRem(16),
    lineHeight: 1.1,
    whiteSpace: "pre-line",
  },
  sortSection: {
    display: "flex",
    alignItems: "center",
    gap: pxToRem(12),
    fontWeight: 600,
    width: "100%",
    justifyContent: "space-between",
  },
  sortSelect: {
    "& .MuiInputBase-root": {
      flex: 1,
      minWidth: pxToRem(200),
      borderRadius: pxToRem(8),
      bgcolor: (theme: Theme) => theme.palette.customColors.controlBg,
      fontSize: pxToRem(14),
      transition:
        "border-color .2s ease, box-shadow .2s ease, background-color .2s ease, color .2s ease",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: (theme: Theme) => theme.palette.customColors.controlBorder,
      borderWidth: pxToRem(1),
      borderRadius: pxToRem(8),
    },
    "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
      borderWidth: pxToRem(1),
    },
    "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
      borderWidth: pxToRem(1),
    },
    "& .MuiInputBase-root.Mui-focused": {
      boxShadow: (theme: Theme) => theme.palette.customColors.controlFocusRing,
    },
    "& .MuiSelect-select": {
      color: (theme: Theme) => theme.palette.customColors.controlText,
      fontWeight: 600,
      padding: `${pxToRem(8)} ${pxToRem(12)}`,
    },
    "& .MuiSvgIcon-root": {
      color: (theme: Theme) => theme.palette.customColors.controlText,
    },
  },

  rating: {
    display: "flex",
    flexDirection: "column",
    gap: pxToRem(8),
  },

  ratingRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  ratingLabel: {
    fontSize: pxToRem(14),
    fontWeight: 600,
  },
  ratingRange: {
    color: (theme: Theme) => theme.palette.customColors.controlText,
    fontSize: pxToRem(14),
    fontWeight: 400,
  },
  sliderWrap: {
    px: pxToRem(8),
  },
  slider: {
    color: (theme: Theme) => theme.palette.customColors.accentBlue,
    "& .MuiSlider-rail": {
      bgcolor: (theme: Theme) => theme.palette.customColors.controlMutedBg,
      opacity: 1,
    },
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      boxShadow: "none",
    },
  },
  genreButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: pxToRem(8),
  },
  genreButton: (theme: Theme, isActive: boolean) => ({
    borderRadius: PILL_BORDER_RADIUS,
    textTransform: "none",
    minWidth: "auto",
    fontWeight: 600,
    fontSize: pxToRem(14),
    px: pxToRem(12),
    py: pxToRem(6),
    borderColor: theme.palette.customColors.controlBorder,
    borderWidth: pxToRem(1),
    ...(isActive
      ? {
          boxShadow: "none",
          color: theme.palette.common.white,
          bgcolor: theme.palette.customColors.accentBlue,
          "&:hover": {
            bgcolor: theme.palette.customColors.accentBlue,
            opacity: 0.92,
            borderColor: "primary.main",
            color: theme.palette.common.white,
          },
        }
      : {
          bgcolor: theme.palette.customColors.controlBg,
          color: theme.palette.customColors.controlText,
          "&:hover": {
            bgcolor: theme.palette.customColors.controlBg,
            opacity: 0.92,
            borderColor: "primary.main",
            color: theme.palette.customColors.controlText,
          },
        }),
  }),
  resetButton: (theme: Theme) => ({
    borderRadius: PILL_BORDER_RADIUS,
    textTransform: "none",
    fontWeight: 600,
    px: pxToRem(12),
    py: pxToRem(6),
    fontSize: pxToRem(14),
    bgcolor: theme.palette.customColors.accentBlue,
    "&:hover": {
      bgcolor: theme.palette.customColors.accentBlueHover,
    },
  }),
} as const


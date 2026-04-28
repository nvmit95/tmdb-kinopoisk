import type { Theme } from "@mui/material/styles"
import { PILL_BORDER_RADIUS, pxToRem } from "@/shared/theme"

/** Стили поля и кнопки общего поиска (Welcome + Search). */
export const searchBarInputSlotSx = (theme: Theme) => ({
  borderRadius: PILL_BORDER_RADIUS,
  bgcolor: theme.palette.customColors.controlBg,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.customColors.controlBorder,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.customColors.controlBorder,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.customColors.accentBlue,
    borderWidth: "3px",
  },
  "& .MuiOutlinedInput-input": {
    padding: `${pxToRem(12)} ${pxToRem(16)}`,
  },
})

export const searchBarButtonSx = (theme: Theme) => ({
  borderRadius: PILL_BORDER_RADIUS,
  textTransform: "none",
  px: pxToRem(18),
  py: pxToRem(8),
  minWidth: "auto",
  bgcolor: theme.palette.customColors.accentBlue,
  "&:hover": {
    bgcolor: theme.palette.customColors.accentBlueHover,
  },
  "&.Mui-disabled": {
    bgcolor: theme.palette.customColors.accentBlue,
    opacity: 0.6,
    color: theme.palette.common.white,
  },
})

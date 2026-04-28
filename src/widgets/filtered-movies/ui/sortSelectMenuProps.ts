import type { SelectProps } from "@mui/material/Select"
import type { Theme } from "@mui/material/styles"
import { pxToRem } from "@/shared/theme"

export const filteredMoviesSortSelectMenuProps = {
  anchorOrigin: { vertical: "bottom" as const, horizontal: "left" as const },
  transformOrigin: { vertical: "top" as const, horizontal: "left" as const },
  PaperProps: {
    sx: {
      mt: 1,
      borderRadius: 2,
      bgcolor: (theme: Theme) => theme.palette.customColors.controlBg,
      backgroundImage: "none",
      maxHeight: "none",
      overflow: "hidden",
      border: (theme: Theme) =>
        `1px solid ${theme.palette.customColors.controlBorder}`,
      boxShadow: "none",
    },
  },
  MenuListProps: {
    sx: {
      py: 0,
      "& .MuiMenuItem-root": {
        color: (theme: Theme) => theme.palette.customColors.controlText,
        fontSize: 14,
      },
      "& .MuiMenuItem-root.Mui-selected": {
        bgcolor: "transparent",
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        bgcolor: (theme: Theme) => theme.palette.customColors.accentBlue,
      },
      "& .MuiMenuItem-root:hover": {
        bgcolor: (theme: Theme) => theme.palette.customColors.accentBlue,
      },
      "& .MuiMenuItem-root.Mui-focusVisible": {
        bgcolor: (theme: Theme) => theme.palette.customColors.accentBlue,
      },
      "& .MuiMenuItem-root:first-of-type": {
        borderTopLeftRadius: pxToRem(8),
        borderTopRightRadius: pxToRem(8),
      },
      "& .MuiMenuItem-root:last-of-type": {
        borderBottomLeftRadius: pxToRem(8),
        borderBottomRightRadius: pxToRem(8),
      },
    },
  },
} satisfies NonNullable<SelectProps["MenuProps"]>

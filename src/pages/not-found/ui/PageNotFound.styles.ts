import { PILL_BORDER_RADIUS } from "@/shared/theme"
import type { Theme } from "@mui/material/styles"

export const PAGE_NOT_FOUND_SX = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    padding: "64px 16px",
  },
  image: {
    width: 360,
    height: 360,
    objectFit: "contain",
    borderRadius: "50px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "18px",
    color: (theme: Theme) => theme.palette.text.secondary,
  },
  backButton: (theme: Theme) => ({
    padding: "8px 16px",
    fontSize: "16px",
    borderRadius: PILL_BORDER_RADIUS,
    textTransform: "none",
    bgcolor: theme.palette.customColors.accentBlue,
    "&:hover": {
      bgcolor: theme.palette.customColors.accentBlueHover,
    },
  }),
} as const

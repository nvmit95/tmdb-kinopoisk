import type { Theme } from "@mui/material/styles"
import { TMDB_LOGO_SQUARE } from "@/shared/config/tmdb"

export const TMDB_LOGO_SRC = TMDB_LOGO_SQUARE

export const FOOTER_SX = {
  root: (theme: Theme) => ({
    py: 2,
    px: 3,
    borderTop: 1,
    borderColor: "divider",
    bgcolor: theme.palette.customBackground.footer,
  }),
  text: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    textAlign: "center",
    letterSpacing: 0.2,
  }),
  link: (_theme: Theme) => ({
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "middle",
    ml: 0.5,
    "&:hover": { opacity: 0.85 },
  }),
  logo: (_theme: Theme) => ({
    height: 26,
    width: "auto",
    display: "block",
  }),
} as const


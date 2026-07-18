import type { Theme } from "@mui/material/styles"

export const TMDB_LOGO_SRC =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"

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


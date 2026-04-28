import type { Theme } from "@mui/material/styles"

export const APP_LAYOUT_SX = {
  root: (theme: Theme) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    bgcolor: "background.default",
    transition: theme.transitions.create(["background-color", "color"], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  }),
  main: {
    flex: "1 1 auto",
    width: "100%",
    m: 0,
    p: 0,
  },
} as const


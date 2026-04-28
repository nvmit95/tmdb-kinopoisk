import { alpha } from "@mui/material/styles"
import type { ThemeTokens } from "./tokens"

export const createAppComponents = (tokens: ThemeTokens) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        transition:
          "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), color-scheme 400ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
      body: {
        transition:
          "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), color-scheme 400ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
      "#root": {
        transition:
          "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), border-color 400ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), fill 400ms cubic-bezier(0.4, 0, 0.2, 1), stroke 400ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
      ".MuiAppBar-root, footer": {
        transition:
          "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), border-color 400ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
      "@media (prefers-reduced-motion: reduce)": {
        html: { transition: "none" },
        body: { transition: "none" },
        "#root": { transition: "none" },
        ".MuiAppBar-root, footer": { transition: "none" },
        "*": { scrollBehavior: "auto" },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      containedPrimary: {
        backgroundColor: tokens.accentBlue,
        border: "1px solid transparent",
        "&:hover": {
          backgroundColor: tokens.accentBlue,
          borderColor: "#4f46e5",
        },
      },
      outlinedPrimary: {
        borderColor: tokens.accentBlue,
        color: tokens.accentBlue,
        "&:hover": {
          borderColor: "#4f46e5",
          color: "#4f46e5",
          backgroundColor: "transparent",
        },
      },
      textPrimary: {
        color: tokens.accentBlue,
        "&:hover": {
          color: "#4f46e5",
          backgroundColor: "transparent",
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 9999,
        overflow: "hidden",
      },
      colorPrimary: {
        backgroundColor: alpha("#4f46e5", 0.18),
      },
      barColorPrimary: {
        backgroundColor: "#4f46e5",
      },
    },
  },
})


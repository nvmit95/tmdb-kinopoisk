import { Theme } from "@mui/material/styles"
import { searchBarButtonSx, searchBarInputSlotSx } from "@/shared/styles"
import { pxToRem } from "@/shared/theme"

export const TMDB_IMAGE_ORIGINAL = "https://image.tmdb.org/t/p/original"

const BOTTOM_GRADIENT =
  "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.78) 68%, rgba(0,0,0,1) 100%)"

export const WELCOME_BLOCK_SX = {
  section: (theme: Theme, backdropUrl?: string) => ({
    position: "relative",
    height: pxToRem(700),
    overflow: "hidden",
    bgcolor: theme.palette.background.default,
    // Надёжнее, чем ::before/::after: всегда один background stack.
    backgroundImage: backdropUrl
      ? `${BOTTOM_GRADIENT}, url(${backdropUrl})`
      : BOTTOM_GRADIENT,
    backgroundSize: backdropUrl ? "cover" : "auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }),
  skeletonOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    bgcolor: "action.hover",
    transform: "none",
  },
  container: {
    position: "relative",
    zIndex: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    px: pxToRem(24),
  },
  content: {
    width: "100%",
    maxWidth: pxToRem(560),
    gap: pxToRem(24),
  },
  title: (theme: Theme) => ({
    color: theme.palette.common.white,
  }),
  subtitle: (theme: Theme) => ({
    color: theme.palette.common.white,
  }),
  input: searchBarInputSlotSx,
  button: searchBarButtonSx,
}


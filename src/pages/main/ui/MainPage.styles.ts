import { pxToRem } from "@/shared/theme"

export const MAIN_PAGE_SX = {
  main: {
    bgcolor: "background.default",
    paddingBottom: pxToRem(64),
  },
  stack: {
    gap: pxToRem(56),
  },
} as const


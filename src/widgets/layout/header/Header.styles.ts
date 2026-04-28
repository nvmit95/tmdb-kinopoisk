import { PILL_BORDER_RADIUS, pxToRem } from "@/shared/theme"
import { alpha, Theme } from "@mui/material/styles"

export const HEADER_SX = {
  appBar: (theme: Theme) => ({
    bgcolor: theme.palette.customBackground.header,
    backgroundImage: "none",
    borderBottom: 1,
    borderColor: "divider",
  }),
  toolbar: {
    px: pxToRem(24),
    py: pxToRem(16),
    minHeight: "unset", // убирает стандартную минимальную высоту Toolbar (64px)
    boxSizing: "border-box", // включает padding и border внутрь общей ширины/высоты элемента
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: pxToRem(16),
    width: "100%",
    minWidth: 0,
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0, // запрещает элементу сжиматься внутри flex-контейнера (логотип не будет ужиматься)
    lineHeight: 0, // убирает лишнюю высоту строки (особенно важно для img, чтобы не было “лишнего воздуха”)
  },
  logoImg: {
    height: pxToRem(24),
    width: "auto",
    display: "block",
  },
  navStack: {
    flex: 1,
    minWidth: 0,
  },
  navDivider: (theme: Theme) => ({
    borderColor: theme.palette.text.secondary,
    opacity: 0.35,
    alignSelf: "center",
    height: "1em", // ограничен высотой текста
    // mx: "0.5rem", // горизонтальные отступы
  }),
  navItem: (theme: Theme) => ({
    px: pxToRem(12),
    py: pxToRem(4),
    color: theme.palette.text.primary,
    fontWeight: 500,
    textDecoration: "none",
    fontSize: pxToRem(16),
    letterSpacing: 0.15,
    whiteSpace: "nowrap",
    borderRadius: PILL_BORDER_RADIUS,
    transition:
      "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), color 400ms cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      color: theme.palette.primary.main,
    },

    "&.active": {
      color: theme.palette.text.primary,
      bgcolor: theme.palette.action.selected,
    },

    "&.active:hover": {
      color: theme.palette.primary.main,
    },
  }),
  themeButton: (theme: Theme, mode: "light" | "dark") => ({
    flexShrink: 0,
    width: pxToRem(40),
    height: pxToRem(40),
    minWidth: pxToRem(40),
    minHeight: pxToRem(40),
    p: 0,
    borderRadius: "50%",
    boxSizing: "border-box",
    border: "1px solid",
    borderColor:
      mode === "light"
        ? alpha(theme.palette.common.black, 0.14)
        : alpha(theme.palette.common.white, 0.2),
    bgcolor: "transparent",
    color: theme.palette.warning.main,
    transition:
      "border-color 400ms cubic-bezier(0.4, 0, 0.2, 1), color 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      transform: `translateY(${pxToRem(1)})`,
    },
    "&:active": {
      transform: "translateY(0)",
    },
  }),
  themeIcon: {
    fontSize: pxToRem(22),
  },
  linearProgress: (theme: Theme) => ({
    bgcolor: alpha(theme.palette.primary.main, 0.18),
    "& .MuiLinearProgress-bar1, & .MuiLinearProgress-bar2": {
      backgroundColor: theme.palette.primary.main,
    },
    // Замедляем движение indeterminate полос
    "& .MuiLinearProgress-bar1Indeterminate, & .MuiLinearProgress-bar2Indeterminate": {
      animationDuration: "2.6s",
    },
  }),
} as const


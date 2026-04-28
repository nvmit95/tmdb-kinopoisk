/**
 * Lightweight px→rem converter.
 * Matches MUI default htmlFontSize (16) used by this app's theme.
 */
export const pxToRem = (px: number) => `${px / 16}rem`

import type { ThemeMode } from "@/shared/types/types"
import { THEME_MODE_STORAGE_KEY } from "@/app/constants"

export function loadThemeMode(): ThemeMode {
  try {
    const raw = localStorage.getItem(THEME_MODE_STORAGE_KEY)
    return raw === "light" || raw === "dark" ? raw : "dark"
  } catch {
    return "dark"
  }
}

export function persistThemeMode(themeMode: ThemeMode) {
  try {
    localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode)
  } catch {
    // ignore storage errors (private mode, disabled storage, etc.)
  }
}

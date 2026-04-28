import { App } from "@/app/App"
import { loadThemeMode } from "@/app/lib/themeModeStorage"
import { applyThemeToDocument } from "@/shared/theme"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router"
import { store } from "./app/store"

try {
  const themeMode = loadThemeMode()
  applyThemeToDocument(themeMode)
} catch (e) {
  console.error("Theme bootstrap failed", e)
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)

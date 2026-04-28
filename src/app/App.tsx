import { APP_LAYOUT_SX } from "@/app/App.styles"
import { selectThemeMode } from "@/app/app-slice"
import { Routing } from "@/app/router"
import { ScrollToTop } from "@/app/router/ScrollToTop"
import { ErrorSnackbar } from "@/shared/components"
import { useAppSelector } from "@/shared/hooks"
import { applyThemeToDocument, getTheme } from "@/shared/theme"
import { Footer } from "@/widgets/layout/footer/Footer"
import { Header } from "@/widgets/layout/header/Header"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { useEffect, useMemo } from "react"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = useMemo(() => getTheme(themeMode), [themeMode])

  useEffect(() => {
    applyThemeToDocument(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={APP_LAYOUT_SX.root}>
        <CssBaseline />
        <ScrollToTop />
        <Header />
        <Box component="main" sx={APP_LAYOUT_SX.main}>
          <Routing />
        </Box>
        <Footer />
        <ErrorSnackbar />
      </Box>
    </ThemeProvider>
  )
}


import {
  changeThemeModeAC,
  selectAppStatus,
  selectThemeMode,
} from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined"
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined"
import { useCallback } from "react"
import { Link, NavLink } from "react-router"
import { pxToRem } from "@/shared/theme"
import { HEADER_SX } from "./Header.styles"

const TMDB_LOGO_SRC =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"

const NAV_ITEMS = [
  { label: "Main", to: "/" },
  { label: "Category movies", to: "/category-movies" },
  { label: "Filtered movies", to: "/filtered-movies" },
  { label: "Search", to: "/search" },
  { label: "Favorites", to: "/favorites" },
] as const
export const Header = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectAppStatus)
  const themeMode = useAppSelector(selectThemeMode)

  const {
    appBar,
    logoBox,
    logoImg,
    navItem,
    navStack,
    navDivider,
    themeIcon,
    themeButton,
    toolbar,
    container,
  } = HEADER_SX

  const toggleTheme = useCallback(() => {
    dispatch(
      changeThemeModeAC({
        themeMode: themeMode === "light" ? "dark" : "light",
      }),
    )
  }, [dispatch, themeMode])

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={(theme) => appBar(theme)}
    >
      <Toolbar sx={toolbar}>
        <Container maxWidth="lg" disableGutters sx={container}>
          <Box component={Link} to="/" sx={logoBox}>
            <img
              src={TMDB_LOGO_SRC}
              alt="The Movie Database"
              style={logoImg}
            />
          </Box>

          <Stack
            // Stack — для удобного горизонтального/вертикального расположения элементов с gap и divider
            component="nav"
            direction="row"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={(theme) => navDivider(theme)}
              />
            }
            gap={pxToRem(12)}
            alignItems="center"
            justifyContent="center"
            flexWrap="nowrap"
            aria-label="Main navigation"
            sx={navStack}
          >
            {NAV_ITEMS.map((item) => (
              <Typography
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.to === "/"}
                sx={(theme) => navItem(theme)}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>

          <IconButton
            onClick={toggleTheme}
            aria-label={
              themeMode === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            sx={(theme) => themeButton(theme, themeMode)}
          >
            {themeMode === "dark" ? (
              <WbSunnyOutlined sx={themeIcon} />
            ) : (
              <DarkModeOutlined sx={themeIcon} />
            )}
          </IconButton>
        </Container>
      </Toolbar>

      {status === "loading" && (
        <LinearProgress sx={(theme) => HEADER_SX.linearProgress(theme)} />
      )}
    </AppBar>
  )
}

import {
  changeThemeModeAC,
  selectAppStatus,
  selectThemeMode,
} from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useCallback, useState } from "react"
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
  const [mobileOpen, setMobileOpen] = useState(false)

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
    menuButton,
    drawerPaper,
    drawerNavItem,
  } = HEADER_SX

  const toggleTheme = useCallback(() => {
    dispatch(
      changeThemeModeAC({
        themeMode: themeMode === "light" ? "dark" : "light",
      }),
    )
  }, [dispatch, themeMode])

  const closeDrawer = () => setMobileOpen(false)

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={(theme) => appBar(theme)}
    >
      <Toolbar sx={toolbar}>
        <Container maxWidth="lg" disableGutters sx={container}>
          <IconButton
            edge="start"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            sx={menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Box component={Link} to="/" sx={logoBox}>
            <img
              src={TMDB_LOGO_SRC}
              alt="The Movie Database"
              style={logoImg}
            />
          </Box>

          <Stack
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

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
        slotProps={{ paper: { sx: drawerPaper } }}
      >
        <List component="nav" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              end={item.to === "/"}
              onClick={closeDrawer}
              sx={(theme) => drawerNavItem(theme)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {status === "loading" && (
        <LinearProgress sx={(theme) => HEADER_SX.linearProgress(theme)} />
      )}
    </AppBar>
  )
}

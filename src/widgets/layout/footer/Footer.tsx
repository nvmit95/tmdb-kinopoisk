import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { FOOTER_SX, TMDB_LOGO_SRC } from "./Footer.styles"

export const Footer = () => {
  const year = new Date().getFullYear()

  const { root, text, link, logo } = FOOTER_SX

  return (
    <Box
      component="footer"
      sx={(theme) => root(theme)}
    >
      <Container maxWidth="lg">
        {/*lg-1200px*/}
        <Typography
          variant="body2"
          sx={(theme) => text(theme)}
        >
          © {year} Kinopoisk Demo · Data courtesy of{" "}
          <Link
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            underline="none"
            aria-label="The Movie Database"
            sx={(theme) => link(theme)}
          >
            <Box
              component="img"
              src={TMDB_LOGO_SRC}
              alt="TMDB"
              sx={(theme) => logo(theme)}
            />
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}

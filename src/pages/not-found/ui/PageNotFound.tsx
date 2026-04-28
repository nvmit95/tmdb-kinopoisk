import { Path } from "@/shared/config/paths"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { Link } from "react-router"
import notFoundImg from "@/assets/404.png"
import { PAGE_NOT_FOUND_SX } from "./PageNotFound.styles"

export const PageNotFound = () => (
  <Container sx={PAGE_NOT_FOUND_SX.container}>
    <Box component="img" sx={PAGE_NOT_FOUND_SX.image} src={notFoundImg} alt="404 - Page not found" />

    <Typography component="h1" sx={PAGE_NOT_FOUND_SX.subtitle}>
      Page not found. We can’t find what you’re looking for
    </Typography>
    <Button
      variant="contained"
      component={Link}
      to={Path.Main}
      sx={(theme) => PAGE_NOT_FOUND_SX.backButton(theme)}
    >
      Back to home
    </Button>
  </Container>
)

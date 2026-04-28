import { useMovieId } from "@/shared/hooks/useMovieId"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { MovieDetails, MOVIE_DETAILS_SPACING } from "@/widgets/movie-details"
import { MOVIE_DETAILS_PAGE_SX } from "./MovieDetailsPage.styles"

export const MovieDetailsPage = () => {
  const movieId = useMovieId()

  if (!movieId) {
    return (
      <Container disableGutters sx={MOVIE_DETAILS_PAGE_SX.notFoundContainer}>
        <Typography sx={MOVIE_DETAILS_PAGE_SX.notFoundText}>Movie not found.</Typography>
      </Container>
    )
  }

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={MOVIE_DETAILS_PAGE_SX.container(MOVIE_DETAILS_SPACING)}
    >
      <MovieDetails movieId={movieId} />
    </Container>
  )
}

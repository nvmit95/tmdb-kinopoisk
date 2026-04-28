import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from "@/entities/movie/api/moviesApi"
import { MOVIE_DETAILS_SX } from "@/widgets/movie-details/config/movieDetails.constants"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { MovieCast } from "./movie-cast/MovieCast"
import { MovieHeader } from "./movie-header/MovieHeader"
import { SimilarMovies } from "./similar-movies/SimilarMovies"

type Props = {
  movieId: number
}

export const MovieDetails = ({ movieId }: Props) => {
  const detailsQuery = useGetMovieDetailsQuery(movieId)
  const creditsQuery = useGetMovieCreditsQuery(movieId)
  const similarQuery = useGetSimilarMoviesQuery({
    movieId,
    page: 1,
  })

  return (
    <Box sx={MOVIE_DETAILS_SX.container}>
      <Box
        component="section"
        aria-label="Movie information"
        sx={MOVIE_DETAILS_SX.sectionWrapper}
      >
        <MovieHeader query={detailsQuery} />
      </Box>

      <Box
        component="section"
        aria-labelledby="movie-cast-heading"
        sx={MOVIE_DETAILS_SX.sectionWrapper}
      >
        <Stack
          useFlexGap
          sx={MOVIE_DETAILS_SX.sectionStack}
        >
          <Typography
            id="movie-cast-heading"
            component="h2"
            sx={MOVIE_DETAILS_SX.sectionTitle}
          >
            Cast
          </Typography>
          <MovieCast query={creditsQuery} />
        </Stack>
      </Box>

      <Box
        component="section"
        aria-labelledby="similar-movies-heading"
        sx={MOVIE_DETAILS_SX.sectionWrapper}
      >
        <Stack
          useFlexGap
          sx={MOVIE_DETAILS_SX.sectionStack}
        >
          <Typography
            id="similar-movies-heading"
            component="h2"
            sx={MOVIE_DETAILS_SX.sectionTitle}
          >
            Similar Movies
          </Typography>
          <SimilarMovies query={similarQuery} />
        </Stack>
      </Box>
    </Box>
  )
}

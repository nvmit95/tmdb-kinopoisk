import { MOVIE_DETAILS_SX } from "@/widgets/movie-details/config/movieDetails.constants"
import Box from "@mui/material/Box"
import { MoviePosterCardSkeleton } from "@/widgets/movie-poster-card/ui/MoviePosterCardSkeleton"

export const SimilarMoviesSkeleton = () => {
  return (
    <Box sx={MOVIE_DETAILS_SX.grid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <MoviePosterCardSkeleton key={i} />
      ))}
    </Box>
  )
}

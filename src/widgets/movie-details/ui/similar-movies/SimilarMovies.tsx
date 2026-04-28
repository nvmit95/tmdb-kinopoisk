import { useGetSimilarMoviesQuery } from "@/entities/movie/api/moviesApi"
import type { TmdbMovie } from "@/entities/movie/model/types"
import { MOVIE_DETAILS_SX } from "@/widgets/movie-details/config/movieDetails.constants"
import { MoviePosterCard } from "@/widgets/movie-poster-card/ui/MoviePosterCard"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { SimilarMoviesSkeleton } from "./SimilarMoviesSkeleton"

type Props = {
  query: ReturnType<typeof useGetSimilarMoviesQuery>
}

const MIN_CARDS = 6

export const SimilarMovies = ({ query }: Props) => {
  const { data, isLoading, isError } = query

  if (isError) return <Typography color="error">Error</Typography>

  return (
    <Box>
      {isLoading ? (
        <SimilarMoviesSkeleton />
      ) : (
        <Box sx={MOVIE_DETAILS_SX.grid}>
          {(data?.results ?? []).slice(0, MIN_CARDS).map((m: TmdbMovie) => (
            <MoviePosterCard
              key={m.id}
              movieId={m.id}
              title={m.title}
              posterPath={m.poster_path}
              voteAverage={m.vote_average}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

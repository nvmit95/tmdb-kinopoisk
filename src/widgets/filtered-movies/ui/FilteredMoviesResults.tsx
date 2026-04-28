import type { TmdbMovie } from "@/entities/movie/model/types"
import type { SxProps, Theme } from "@mui/material/styles"
import { FILTERED_MOVIES_SKELETON_COUNT } from "../config/constants"
import { buildPaginationItems } from "@/shared/utils/pagination"
import { MoviePosterCard } from "@/widgets/movie-poster-card/ui/MoviePosterCard"
import { MoviePosterCardSkeleton } from "@/widgets/movie-poster-card/ui/MoviePosterCardSkeleton"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { FILTERED_MOVIES_RESULTS_SX } from "./FilteredMoviesResults.styles"

type Props = {
  movies: TmdbMovie[]
  showSkeleton: boolean
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  postersGridSx: SxProps<Theme>
}

export const FilteredMoviesResults = ({
  movies,
  showSkeleton,
  page,
  pageCount,
  onPageChange,
  postersGridSx,
}: Props) => {
  const sx = FILTERED_MOVIES_RESULTS_SX

  return (
    <Box>
      <Box sx={postersGridSx}>
        {showSkeleton
          ? Array.from({ length: FILTERED_MOVIES_SKELETON_COUNT }, (_, i) => (
              <MoviePosterCardSkeleton key={i} />
            ))
          : movies.map((movie) => (
              <MoviePosterCard
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
              />
            ))}
      </Box>

      {pageCount > 1 && (
        <Stack alignItems="center" sx={sx.paginationWrap}>
          <Stack direction="row" alignItems="center" gap={1.25}>
            {buildPaginationItems(page, pageCount).map((item, idx) => {
              if (item === "ellipsis") {
                return (
                  <Box key={`ellipsis-${idx}`} sx={sx.paginationEllipsis}>
                    ...
                  </Box>
                )
              }

              const isActive = item === page
              return (
                <Button
                  key={item}
                  onClick={() => onPageChange(item)}
                  variant={isActive ? "contained" : "outlined"}
                  color="primary"
                  sx={(theme) => sx.paginationPageButton(theme)}
                >
                  {item}
                </Button>
              )
            })}
          </Stack>
        </Stack>
      )}
    </Box>
  )
}

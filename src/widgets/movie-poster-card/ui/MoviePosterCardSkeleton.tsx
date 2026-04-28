import {
  MOVIE_POSTER_CARD_LAYOUT_SX,
  MOVIE_POSTER_CARD_SKELETON_SX,
  getMoviePosterCardSkeletonTitleHeightPx,
  moviePosterCardSkeletonTitleSx,
} from "./MoviePosterCard.styles"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

export const MoviePosterCardSkeleton = () => {
  const titleSkeletonHeight = getMoviePosterCardSkeletonTitleHeightPx()

  return (
    <Box sx={MOVIE_POSTER_CARD_LAYOUT_SX.gridItem}>
      <Box sx={MOVIE_POSTER_CARD_LAYOUT_SX.posterSurface}>
        <Skeleton variant="rectangular" sx={MOVIE_POSTER_CARD_SKELETON_SX.poster} />
      </Box>

      <Skeleton
        variant="rounded"
        sx={moviePosterCardSkeletonTitleSx(titleSkeletonHeight)}
      />
    </Box>
  )
}

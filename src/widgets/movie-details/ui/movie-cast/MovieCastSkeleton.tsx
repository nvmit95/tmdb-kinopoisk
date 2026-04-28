import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import { MOVIE_CAST_SX } from "./MovieCast.styles"

export const MovieCastSkeleton = () => {
  return (
    <Box sx={MOVIE_CAST_SX.castCardsRow}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Stack
          key={i}
          alignItems="center"
          sx={MOVIE_CAST_SX.castCardStack}
        >
          <Skeleton
            variant="circular"
            sx={MOVIE_CAST_SX.castCardPhotoSkeleton}
          />
          <Stack
            alignItems="center"
            spacing={0}
            sx={MOVIE_CAST_SX.castCardTextStack}
          >
            <Skeleton width="100%" />
            <Skeleton width="70%" height={20} />
          </Stack>
        </Stack>
      ))}
    </Box>
  )
}

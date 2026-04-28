import { pxToRem } from "@/shared/theme"
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

import {
  getMovieHeaderPosterFrameSx,
  getMovieHeaderSkeletonBackButtonPlaceholderSx,
  MOVIE_HEADER_SKELETON_SX,
  MOVIE_HEADER_SX,
} from "./MovieHeader.styles"

export const MovieHeaderSkeleton = () => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      useFlexGap
      alignItems={{ md: "flex-start" }}
      sx={MOVIE_HEADER_SX.root}
    >
      <Box sx={(theme) => getMovieHeaderPosterFrameSx(theme)}>
        <Box sx={MOVIE_HEADER_SX.posterFrameInner}>
          <Skeleton
            variant="rounded"
            sx={MOVIE_HEADER_SKELETON_SX.posterFill}
          />
        </Box>
      </Box>

      <Stack useFlexGap sx={MOVIE_HEADER_SX.contentColumn}>
        <Stack useFlexGap sx={MOVIE_HEADER_SX.titleMetaBlock}>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="flex-start"
            justifyContent="space-between"
            useFlexGap
            sx={MOVIE_HEADER_SX.titleRow}
          >
            <Skeleton
              width="60%"
              height={pxToRem(44)}
              sx={MOVIE_HEADER_SKELETON_SX.titleSkeleton}
            />
            <Skeleton
              variant="rounded"
              width={68}
              height={32}
              sx={(theme) => getMovieHeaderSkeletonBackButtonPlaceholderSx(theme)}
            />
          </Stack>

          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            alignItems="center"
            sx={MOVIE_HEADER_SX.metaRow}
          >
            <Skeleton width={160} height={24} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width={120} height={24} />
          </Stack>
        </Stack>

        <Skeleton width="100%" height={120} />

        <Stack useFlexGap sx={MOVIE_HEADER_SX.genresStack}>
          <Skeleton width={72} height={20} />
          <Skeleton
            width={64}
            height={32}
            sx={MOVIE_HEADER_SKELETON_SX.genrePill}
          />
          <Skeleton
            width={72}
            height={32}
            sx={MOVIE_HEADER_SKELETON_SX.genrePill}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

import { useGetMovieDetailsQuery } from "@/entities/movie/api/moviesApi"
import type { TmdbMovieDetails } from "@/entities/movie/model/types"
import {
  MOVIE_POSTER_PLACEHOLDER,
  TMDB_IMAGE_W780,
} from "@/widgets/movie-poster-card/ui/MoviePosterCard.styles"
import { formatRuntime } from "@/shared/utils/formatRuntime"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router"

import {
  getMovieHeaderGenrePillSx,
  getMovieHeaderGenresLabelSx,
  getMovieHeaderMetaLineSx,
  getMovieHeaderOverviewSx,
  getMovieHeaderPosterFrameSx,
  getMovieHeaderRatingBadgeBoxSx,
  getMovieHeaderRatingBadgeTextSx,
  MOVIE_HEADER_SX,
} from "./MovieHeader.styles"
import { MovieHeaderSkeleton } from "./MovieHeaderSkeleton"

const ratingLabelText = (vote: number | undefined): string => {
  if (vote == null || Number.isNaN(vote)) return "—"
  if (vote === 0) return "0.0"
  return vote.toFixed(1)
}

type MovieDetailsQuery = ReturnType<typeof useGetMovieDetailsQuery>
type MovieGenre = NonNullable<TmdbMovieDetails["genres"]>[number]

type Props = {
  query: MovieDetailsQuery
}

export const MovieHeader = ({ query }: Props) => {
  const { data, isLoading, isError } = query
  const navigate = useNavigate()

  if (isLoading) return <MovieHeaderSkeleton />
  if (isError || !data) return <Typography color="error">Error</Typography>

  const posterSrc = data.poster_path
    ? `${TMDB_IMAGE_W780}${data.poster_path}`
    : MOVIE_POSTER_PLACEHOLDER

  const runtime = formatRuntime(data.runtime)
  const year = data.release_date?.slice(0, 4)
  const vote = data.vote_average

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      useFlexGap
      alignItems={{ md: "flex-start" }}
      sx={MOVIE_HEADER_SX.root}
    >
      <Box sx={(theme) => getMovieHeaderPosterFrameSx(theme)}>
        <Box sx={MOVIE_HEADER_SX.posterFrameInner}>
          <Box
            component="img"
            src={posterSrc}
            alt={data.title}
            sx={MOVIE_HEADER_SX.posterImg}
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
            <Typography component="h1" sx={MOVIE_HEADER_SX.title}>
              {data.title}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              disableElevation
              sx={MOVIE_HEADER_SX.backButton}
            >
              Back
            </Button>
          </Stack>

          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            alignItems="center"
            sx={MOVIE_HEADER_SX.metaRow}
          >
            {year && (
              <Typography
                variant="body1"
                sx={(theme) => getMovieHeaderMetaLineSx(theme)}
              >
                Release year: {year}
              </Typography>
            )}

            <Box sx={(theme) => getMovieHeaderRatingBadgeBoxSx(theme, vote)}>
              <Typography sx={(theme) => getMovieHeaderRatingBadgeTextSx(theme)}>
                {ratingLabelText(vote)}
              </Typography>
            </Box>

            {runtime && (
              <Typography
                variant="body1"
                sx={(theme) => getMovieHeaderMetaLineSx(theme)}
              >
                Runtime: {runtime}
              </Typography>
            )}
          </Stack>
        </Stack>

        {data.overview && (
          <Typography sx={(theme) => getMovieHeaderOverviewSx(theme)}>
            {data.overview}
          </Typography>
        )}

        {data.genres && data.genres.length > 0 && (
          <Stack useFlexGap sx={MOVIE_HEADER_SX.genresStack}>
            <Typography
              component="p"
              sx={(theme) => getMovieHeaderGenresLabelSx(theme)}
            >
              Genres
            </Typography>
            <Box sx={MOVIE_HEADER_SX.genrePillsRow}>
              {data.genres.map((g: MovieGenre) => (
                <Box
                  key={g.id}
                  component="span"
                  sx={(theme) => getMovieHeaderGenrePillSx(theme)}
                >
                  {g.name}
                </Box>
              ))}
            </Box>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

import { useGetMovieCreditsQuery } from "@/entities/movie/api/moviesApi"
import type { TmdbCastMember } from "@/entities/movie/model/types"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import {
  CAST_PHOTO_PLACEHOLDER,
  MOVIE_CAST_SX,
  TMDB_PROFILE_W185,
} from "./MovieCast.styles"
import { MovieCastSkeleton } from "./MovieCastSkeleton"

type Props = {
  query: ReturnType<typeof useGetMovieCreditsQuery>
}

const byBillingOrder = (a: TmdbCastMember, b: TmdbCastMember) =>
  (a.order ?? 99_999) - (b.order ?? 99_999)

const topBilled = (cast: TmdbCastMember[], limit: number) =>
  [...cast].sort(byBillingOrder).slice(0, limit)

const CastCard = ({ actor }: { actor: TmdbCastMember }) => {
  const hasPhoto = Boolean(actor.profile_path)
  const src = hasPhoto
    ? `${TMDB_PROFILE_W185}${actor.profile_path}`
    : CAST_PHOTO_PLACEHOLDER

  return (
    <Stack alignItems="center" sx={MOVIE_CAST_SX.castCardStack}>
      <Box
        component="img"
        src={src}
        alt=""
        onError={(e) => {
          e.currentTarget.src = CAST_PHOTO_PLACEHOLDER
        }}
        sx={MOVIE_CAST_SX.castCardPhoto}
      />
      <Stack
        alignItems="center"
        sx={MOVIE_CAST_SX.castCardTextStack}
        spacing={0}
      >
        <Typography
          component="p"
          sx={MOVIE_CAST_SX.castName}
          noWrap
          title={actor.name}
        >
          {actor.name}
        </Typography>
        <Typography
          component="p"
          sx={MOVIE_CAST_SX.castRole}
          noWrap
          title={actor.character ?? ""}
        >
          {actor.character?.trim() ? actor.character : "—"}
        </Typography>
      </Stack>
    </Stack>
  )
}

export const MovieCast = ({ query }: Props) => {
  const { data, isLoading, isError } = query

  if (isError) return <Typography color="error">Error</Typography>

  return (
    <Box>
      {isLoading ? (
        <MovieCastSkeleton />
      ) : (
        <Box sx={MOVIE_CAST_SX.castCardsRow}>
          {topBilled(data?.cast ?? [], 6).map((actor) => (
            <CastCard
              key={actor.credit_id ?? `cast-${actor.id}-${actor.order ?? 0}`}
              actor={actor}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

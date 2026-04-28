import { selectFavoritesList } from "@/entities/favorites/model/favorites-slice"
import { useAppSelector } from "@/shared/hooks"
import { MoviePosterCard } from "@/widgets/movie-poster-card/ui/MoviePosterCard"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { FAVORITES_PAGE_SX } from "./FavoritesPage.styles"

export const FavoritesPage = () => {
  const favorites = useAppSelector(selectFavoritesList)
  const sx = FAVORITES_PAGE_SX

  return (
    <Box component="main" sx={sx.main}>
      <Container maxWidth="lg" disableGutters sx={sx.container}>
        <Stack sx={sx.rootStack}>
          <Stack sx={sx.titleStack}>
            <Typography component="h1" sx={sx.h1}>
              Favorites
            </Typography>
            <Typography component="h2" sx={sx.h2}>
              Favorite Movies
            </Typography>
          </Stack>

          {favorites.length === 0 ? (
            <Typography color="text.secondary" sx={sx.emptyHint}>
              Movies you save with the heart icon on a poster will show up here.
            </Typography>
          ) : (
            <Box sx={sx.postersGrid}>
              {favorites.map((m) => (
                <MoviePosterCard
                  key={m.id}
                  movieId={m.id}
                  title={m.title}
                  posterPath={m.posterUrl}
                  voteAverage={m.voteAverage}
                  showRatingBadge={typeof m.voteAverage === "number"}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

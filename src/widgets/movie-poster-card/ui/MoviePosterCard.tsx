import { useIsMovieFavorite, useToggleFavoriteMovie } from "@/features/favorite-movie"
import { moviePath } from "@/entities/movie/lib/moviePath"
import {
  MOVIE_POSTER_CARD_LAYOUT_SX,
  MOVIE_POSTER_CARD_LINK_STYLE,
  MOVIE_POSTER_CARD_POSTER_CONTENT_SX,
  MOVIE_POSTER_CARD_POSTER_FRAME_SX,
  MOVIE_POSTER_CARD_POSTER_IMAGE_SX,
  MOVIE_POSTER_CARD_POSTER_LINK_STYLE,
  MOVIE_POSTER_PLACEHOLDER,
  moviePosterCardFavoriteButtonSx,
  moviePosterCardFavoriteHeartOutlineSx,
  moviePosterCardFavoriteHeartSx,
  moviePosterCardRatingBadgeSx,
  moviePosterCardRatingBadgeTextSx,
  moviePosterCardTitleSx,
  TMDB_IMAGE_W500,
} from "./MoviePosterCard.styles"
import Favorite from "@mui/icons-material/Favorite"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Link } from "react-router"

export { MOVIE_POSTER_PLACEHOLDER } from "./MoviePosterCard.styles"

const ratingLabelText = (vote: number | undefined): string => {
  if (vote == null || Number.isNaN(vote)) return "—"
  if (vote === 0) return "0.0"
  return vote.toFixed(1)
}

export type MoviePosterCardProps = {
  /** ID фильма в TMDB (из URL карточки). */
  movieId: number
  /** Название под постером; же текст можно использовать в `alt` у картинки. */
  title: string
  /** `poster_path` из API (относительный путь, без базы `image.tmdb.org`). */
  posterPath?: string | null
  /** Средняя оценка TMDB для бейджа на постере. */
  voteAverage?: number
  /** Показывать кнопку «сердце» избранного на постере. */
  showFavorite?: boolean
  /** Круглый бейдж с рейтингом на постере (в избранном оценка может отсутствовать). */
  showRatingBadge?: boolean
}

export const MoviePosterCard = ({
  movieId,
  title,
  posterPath,
  voteAverage,
  showFavorite = true,
  showRatingBadge = true,
}: MoviePosterCardProps) => {
  const isFavorite = useIsMovieFavorite(movieId)
  const toggleFavorite = useToggleFavoriteMovie()

  const posterSrc = posterPath
    ? `${TMDB_IMAGE_W500}${posterPath}`
    : MOVIE_POSTER_PLACEHOLDER

  const onToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite({
      id: movieId,
      title,
      posterUrl: posterPath ?? null,
      voteAverage,
    })
  }

  return (
    <Box sx={MOVIE_POSTER_CARD_LAYOUT_SX.gridItem}>
      <Box
        className="movie-poster-frame"
        sx={MOVIE_POSTER_CARD_POSTER_FRAME_SX}
      >
        <Box sx={MOVIE_POSTER_CARD_LAYOUT_SX.posterSurface}>
          <Link
            to={moviePath(movieId)}
            style={MOVIE_POSTER_CARD_POSTER_LINK_STYLE}
          >
            <Box sx={MOVIE_POSTER_CARD_POSTER_CONTENT_SX}>
              <Box
                component="img"
                src={posterSrc}
                alt={title}
                sx={MOVIE_POSTER_CARD_POSTER_IMAGE_SX}
              />
              {showRatingBadge && (
                <Box
                  sx={(theme) => moviePosterCardRatingBadgeSx(theme, voteAverage)}
                >
                  <Typography
                    sx={(theme) => moviePosterCardRatingBadgeTextSx(theme)}
                  >
                    {ratingLabelText(voteAverage)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Link>
        </Box>

        {showFavorite && (
          <IconButton
            className="movie-poster-favorite-btn"
            type="button"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            onClick={onToggleFavorite}
            sx={(theme) => moviePosterCardFavoriteButtonSx(theme, isFavorite)}
            size="small"
          >
            {isFavorite ? (
              <Favorite
                sx={(theme) => moviePosterCardFavoriteHeartSx(theme)}
                fontSize="small"
              />
            ) : (
              <FavoriteBorder
                sx={(theme) => moviePosterCardFavoriteHeartOutlineSx(theme)}
                fontSize="small"
              />
            )}
          </IconButton>
        )}
      </Box>

      <Link to={moviePath(movieId)} style={MOVIE_POSTER_CARD_LINK_STYLE}>
        <Typography component="p" sx={moviePosterCardTitleSx()}>
          {title}
        </Typography>
      </Link>
    </Box>
  )
}

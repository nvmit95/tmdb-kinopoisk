import type { MovieCategoryList } from "@/entities/movie/model/types"
import { useGetMovieCategoryListQuery } from "@/entities/movie/api/moviesApi"
import { getMovieCategoryTabMeta } from "@/entities/movie/lib/categoryMeta"
import { MoviePosterCard } from "@/widgets/movie-poster-card/ui/MoviePosterCard"
import { MoviePosterCardSkeleton } from "@/widgets/movie-poster-card/ui/MoviePosterCardSkeleton"
import { PREVIEW_COUNT } from "./constants"
import { MOVIE_PREVIEW_SECTION_SX } from "./MovieCategoryPreviewSection.styles"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { Link } from "react-router"

type Props = {
  /** Код списка TMDB: popular | top_rated | upcoming | now_playing */
  category: MovieCategoryList
  /**
   * Куда ведёт кнопка «View More» (полный путь с query), например
   * `/category-movies?category=top_rated`
   */
  viewMoreTo: string
  /** id заголовка секции для связи `aria-labelledby` у `<section>` */
  labelledById: string
}

/**
 * Секция главной: заголовок по категории TMDB, сетка превью и ссылка «View More» на полный список.
 */
export const MovieCategoryPreviewSection = ({
  category,
  viewMoreTo,
  labelledById,
}: Props) => {
  const categoryTab = getMovieCategoryTabMeta(category)
  const { data, isLoading, isFetching } = useGetMovieCategoryListQuery({
    category,
    page: 1,
  })

  const movies = (data?.results ?? []).slice(0, PREVIEW_COUNT)
  const showSkeleton = isLoading || (isFetching && !data)

  return (
    <Box component="section" aria-labelledby={labelledById}>
      <Container maxWidth="lg" disableGutters>
        <Box sx={MOVIE_PREVIEW_SECTION_SX.headerRow}>
          <Typography
            id={labelledById}
            component="h2"
            sx={(theme) => MOVIE_PREVIEW_SECTION_SX.title(theme)}
          >
            {categoryTab?.label ?? category}
          </Typography>
          <Button
            component={Link}
            to={viewMoreTo}
            variant="outlined"
            sx={(theme) => MOVIE_PREVIEW_SECTION_SX.viewMoreButton(theme)}
          >
            View more
          </Button>
        </Box>

        <Box sx={MOVIE_PREVIEW_SECTION_SX.grid}>
          {showSkeleton
            ? Array.from({ length: PREVIEW_COUNT }, (_, i) => (
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
      </Container>
    </Box>
  )
}

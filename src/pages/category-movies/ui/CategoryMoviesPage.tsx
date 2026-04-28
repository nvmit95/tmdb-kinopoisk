import {
  type MovieCategoryList,
  useGetMovieCategoryListQuery,
} from "@/entities/movie/api/moviesApi"

import {
  getMovieCategoryTabMeta,
  MOVIE_CATEGORY_TABS,
  parseMovieCategoryParam,
} from "@/entities/movie/lib/categoryMeta"

import { MoviePosterCard } from "@/widgets/movie-poster-card/ui/MoviePosterCard"
import { MoviePosterCardSkeleton } from "@/widgets/movie-poster-card/ui/MoviePosterCardSkeleton"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { useSearchParams } from "react-router"

import {
  buildPaginationItems,
  CATEGORY_DEFAULT,
  TMDB_MAX_PAGE,
} from "@/pages/category-movies/ui/constants"
import { CATEGORY_MOVIES_PAGE_SX } from "@/pages/category-movies/ui/CategoryMoviesPage.styles"

import { PAGE_LAYOUT_SX } from "@/shared/styles"

export const CategoryMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const sx = CATEGORY_MOVIES_PAGE_SX
  const layoutSx = PAGE_LAYOUT_SX

  // 🔹 URL = source of truth
  const category =
    parseMovieCategoryParam(searchParams.get("category")) ?? CATEGORY_DEFAULT

  const page = Number(searchParams.get("page") ?? "1")

  const { data, isLoading, isFetching } = useGetMovieCategoryListQuery({
    category,
    page,
  })

  const categoryTab = getMovieCategoryTabMeta(category)

  const totalPages = data?.total_pages ?? 1
  const movies = data?.results ?? []
  const showSkeleton = isLoading || (isFetching && !data)
  const pageCount = Math.min(totalPages, TMDB_MAX_PAGE)

  // 🔹 смена категории → сброс страницы
  const selectCategory = (newCategory: MovieCategoryList) => {
    setSearchParams({
      category: newCategory,
      page: "1",
    })
  }

  // 🔹 смена страницы
  const changePage = (newPage: number) => {
    setSearchParams({
      category,
      page: String(newPage),
    })
  }

  return (
    <Box component="main" sx={layoutSx.root}>
      <Container maxWidth="lg" sx={layoutSx.container}>
        {/* Tabs */}
        <Stack {...sx.tabs}>
          {MOVIE_CATEGORY_TABS.map(({ category: cat, label }) => {
            const isActive = cat === category

            return (
              <Button
                key={cat}
                onClick={() => selectCategory(cat)}
                variant={isActive ? "contained" : "outlined"}
                color="primary"
                sx={(theme) => sx.tabButton(theme, isActive)}
              >
                {label}
              </Button>
            )
          })}
        </Stack>

        {/* Title */}
        <Typography component="h1" sx={sx.title}>
          {categoryTab?.label ?? category}
        </Typography>

        {/* Movies */}
        <Box sx={layoutSx.postersGrid}>
          {showSkeleton
            ? Array.from({ length: 20 }, (_, i) => (
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

        {/* Pagination */}
        {pageCount > 1 && (
          <Stack alignItems="center" sx={sx.paginationWrap}>
            <Stack {...sx.paginationRow}>
              {buildPaginationItems(page, pageCount).map((item, idx) => {
                if (item === "ellipsis") {
                  return (
                    <Box key={`ellipsis-${idx}`} sx={sx.ellipsis}>
                      ...
                    </Box>
                  )
                }

                const isActive = item === page

                return (
                  <Button
                    key={item}
                    onClick={() => changePage(item)}
                    variant={isActive ? "contained" : "outlined"}
                    color="primary"
                    sx={(theme) => sx.pageButton(theme, isActive)}
                  >
                    {item}
                  </Button>
                )
              })}
            </Stack>
          </Stack>
        )}
      </Container>
    </Box>
  )
}

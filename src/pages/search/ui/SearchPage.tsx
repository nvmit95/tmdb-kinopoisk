import { useSearchMoviesQuery } from "@/entities/movie/api/moviesApi"
import { SearchBar } from "@/shared/components"
import { MoviePosterCard } from "@/widgets/movie-poster-card/ui/MoviePosterCard"
import { MoviePosterCardSkeleton } from "@/widgets/movie-poster-card/ui/MoviePosterCardSkeleton"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { useEffect, useMemo, useState, type FormEventHandler } from "react"
import { useSearchParams } from "react-router"

import {
  PAGE_LAYOUT_SX,
  searchBarButtonSx,
  searchBarInputSlotSx,
} from "@/shared/styles"
import {
  buildPaginationItems,
  TMDB_MAX_PAGE,
} from "@/pages/category-movies/ui/constants"
import { SEARCH_DEFAULTS } from "./constants"
import { SEARCH_PAGE_LAYOUT_SX, SEARCH_PAGE_SX } from "./SearchPage.styles"

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const sx = SEARCH_PAGE_SX
  const layoutSx = PAGE_LAYOUT_SX
  const searchLayoutSx = SEARCH_PAGE_LAYOUT_SX

  // 🔹 URL = source of truth
  const urlQuery = searchParams.get("query") ?? SEARCH_DEFAULTS.query
  const urlPage = clamp(
    Math.trunc(Number(searchParams.get("page") ?? SEARCH_DEFAULTS.page)),
    1,
    TMDB_MAX_PAGE,
  )

  const [input, setInput] = useState(urlQuery)
  useEffect(() => setInput(urlQuery), [urlQuery])

  const queryForRequest = useMemo(() => urlQuery.trim(), [urlQuery])

  const shouldSkip = queryForRequest.length === 0

  const { currentData, isLoading, isFetching } = useSearchMoviesQuery(
    { query: queryForRequest, page: urlPage },
    { skip: shouldSkip },
  )

  // RTK Query keeps previous `data` while a new request is fetching.
  // We render only `currentData` so old results don't flash between searches.
  const movies = currentData?.results ?? []
  const totalPages = currentData?.total_pages ?? 1
  const pageCount = Math.min(totalPages, TMDB_MAX_PAGE)
  const showSkeleton = !shouldSkip && (isLoading || isFetching) && !currentData

  const isEmptyInput = input.trim().length === 0

  const setCommittedQuery = (nextQueryRaw: string) => {
    const nextQuery = nextQueryRaw.trim()
    if (!nextQuery) {
      setSearchParams({}, { replace: true })
      return
    }
    setSearchParams({ query: nextQuery, page: "1" }, { replace: true })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setCommittedQuery(input)
  }

  const changePage = (newPage: number) => {
    const next: Record<string, string> = {}
    if (queryForRequest) next.query = queryForRequest
    next.page = String(newPage)
    setSearchParams(next)
  }

  return (
    <Box component="main" sx={searchLayoutSx.root}>
      <Container maxWidth="lg" disableGutters sx={searchLayoutSx.container}>
        <Stack sx={sx.pageStack}>
          <Typography component="h1" sx={sx.title}>
            Search Results
          </Typography>

          <Box sx={sx.searchRow}>
            <SearchBar
              value={input}
              onValueChange={(v) => {
                setInput(v)
                if (v.length === 0) {
                  setSearchParams({}, { replace: true })
                }
              }}
              onSubmit={onSubmit}
              placeholder="Search for a movie"
              disabled={isEmptyInput}
              inputSx={searchBarInputSlotSx}
              buttonSx={searchBarButtonSx}
              maxWidth={560}
            />
          </Box>

          {shouldSkip ? (
            <Typography color="text.secondary">
              Enter a movie title to start searching
            </Typography>
          ) : (
            <Stack sx={sx.pageStack}>
              <Typography sx={sx.resultsFor}>
                Results for &quot;{queryForRequest}&quot;
              </Typography>

              {!showSkeleton && currentData && movies.length === 0 ? (
                <Typography color="text.secondary">
                  No matches found for &quot;{queryForRequest}&quot;
                </Typography>
              ) : (
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
              )}

              {pageCount > 1 && (
                <Stack alignItems="center" sx={sx.paginationWrap}>
                  <Stack direction="row" alignItems="center" gap={1.25}>
                    {buildPaginationItems(urlPage, pageCount).map((item, idx) => {
                      if (item === "ellipsis") {
                        return (
                          <Box
                            key={`ellipsis-${idx}`}
                            sx={sx.paginationEllipsis}
                          >
                            ...
                          </Box>
                        )
                      }

                      const isActive = item === urlPage
                      return (
                        <Box
                          component="button"
                          key={item}
                          onClick={() => changePage(item)}
                          type="button"
                          sx={sx.paginationPageButton(isActive)}
                        >
                          {item}
                        </Box>
                      )
                    })}
                  </Stack>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}


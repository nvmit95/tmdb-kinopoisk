import { useGetMovieGenresQuery } from "@/entities/genre/api/genresApi"
import { useDiscoverMoviesQuery } from "@/entities/movie/api/moviesApi"
import { useDebouncedValue } from "@/shared/hooks"
import { TMDB_MAX_PAGE } from "@/shared/utils/pagination"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import {
  FILTERED_DEFAULTS,
  FILTERED_VOTE_DEBOUNCE_MS,
} from "../config/constants"
import { buildFilteredMoviesUrlParams } from "../lib/buildFilteredMoviesUrlParams"
import { parseIntList, parseNumber } from "../lib/searchParamsParsers"
import { clamp, uiToTmdbVote } from "../lib/voteRange"

export const useFilteredMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get("sort_by") ?? FILTERED_DEFAULTS.sortBy

  const page = clamp(
    Math.trunc(parseNumber(searchParams.get("page"), FILTERED_DEFAULTS.page)),
    1,
    TMDB_MAX_PAGE,
  )

  const urlVoteMin = clamp(
    parseNumber(searchParams.get("vote_gte"), FILTERED_DEFAULTS.voteRange[0]),
    0,
    100,
  )
  const urlVoteMax = clamp(
    parseNumber(searchParams.get("vote_lte"), FILTERED_DEFAULTS.voteRange[1]),
    0,
    100,
  )

  // Строка из URL, а не весь searchParams — иначе новый массив жанров на каждом ререндере и лишние срабатывания эффекта синка.
  const genresParam = searchParams.get("genres")
  const selectedGenres = useMemo(
    () => parseIntList(genresParam),
    [genresParam],
  )

  const [voteRange, setVoteRange] = useState<[number, number]>([
    Math.min(urlVoteMin, urlVoteMax),
    Math.max(urlVoteMin, urlVoteMax),
  ])

  useEffect(() => {
    setVoteRange([
      Math.min(urlVoteMin, urlVoteMax),
      Math.max(urlVoteMin, urlVoteMax),
    ])
  }, [urlVoteMin, urlVoteMax])

  const debouncedVoteRange = useDebouncedValue(voteRange, FILTERED_VOTE_DEBOUNCE_MS)

  useEffect(() => {
    // Пока debounce "догоняет" реальный `voteRange`, не пишем в URL устаревшие значения.
    // Иначе после reset/изменений можно перезаписать query старым рейтингом.
    if (
      debouncedVoteRange[0] !== voteRange[0] ||
      debouncedVoteRange[1] !== voteRange[1]
    ) {
      return
    }

    const next = buildFilteredMoviesUrlParams({
      sortBy,
      page,
      // Во время drag по слайдеру не дергаем URL каждое изменение,
      // иначе MUI Slider начинает "бороться" со стейтом из URL и возникает дерганье.
      voteRange: debouncedVoteRange,
      genreIds: selectedGenres,
    })

    // Не триггерим лишние навигации, если query уже совпадает.
    // `searchParams` меняется по ссылке часто, поэтому сравниваем по значениям.
    const same =
      searchParams.get("sort_by") === next.sort_by &&
      searchParams.get("page") === next.page &&
      searchParams.get("vote_gte") === next.vote_gte &&
      searchParams.get("vote_lte") === next.vote_lte &&
      (searchParams.get("genres") ?? "") === (next.genres ?? "")

    if (!same) {
      setSearchParams(next, { replace: true })
    }
  }, [
    page,
    searchParams,
    selectedGenres,
    setSearchParams,
    sortBy,
    voteRange,
    debouncedVoteRange,
  ])

  const withGenresParam =
    selectedGenres.length > 0 ? selectedGenres.join(",") : undefined

  const { data: genresData } = useGetMovieGenresQuery()

  const { data, isLoading, isFetching } = useDiscoverMoviesQuery({
    page,
    sort_by: sortBy,
    vote_average_gte: uiToTmdbVote(debouncedVoteRange[0]),
    vote_average_lte: uiToTmdbVote(debouncedVoteRange[1]),
    with_genres: withGenresParam,
  })

  const movies = data?.results ?? []
  const totalPages = data?.total_pages ?? 1
  const pageCount = Math.min(totalPages, TMDB_MAX_PAGE)
  const showSkeleton = isLoading || (isFetching && !data)

  const changePage = useCallback(
    (newPage: number) => {
      setSearchParams(
        buildFilteredMoviesUrlParams({
          sortBy,
          page: newPage,
          voteRange,
          genreIds: selectedGenres,
        }),
      )
    },
    [sortBy, voteRange, selectedGenres, setSearchParams],
  )

  const changeSort = useCallback(
    (newSortBy: string) => {
      setSearchParams(
        buildFilteredMoviesUrlParams({
          sortBy: newSortBy,
          page: 1,
          voteRange,
          genreIds: selectedGenres,
        }),
      )
    },
    [voteRange, selectedGenres, setSearchParams],
  )

  const toggleGenre = useCallback(
    (genreId: number) => {
      const nextGenres = selectedGenres.includes(genreId)
        ? selectedGenres.filter((id) => id !== genreId)
        : [...selectedGenres, genreId]

      setSearchParams(
        buildFilteredMoviesUrlParams({
          sortBy,
          page: 1,
          voteRange,
          genreIds: nextGenres,
        }),
      )
    },
    [sortBy, voteRange, selectedGenres, setSearchParams],
  )

  const resetFilters = useCallback(() => {
    // Сбрасываем локальный слайдер сразу, чтобы не было "отката" от debounced-синка URL.
    setVoteRange([...FILTERED_DEFAULTS.voteRange])
    setSearchParams(
      buildFilteredMoviesUrlParams({
        sortBy: FILTERED_DEFAULTS.sortBy,
        page: FILTERED_DEFAULTS.page,
        voteRange: [...FILTERED_DEFAULTS.voteRange],
        genreIds: [],
      }),
    )
  }, [setSearchParams, setVoteRange])

  const voteLabel = `${uiToTmdbVote(voteRange[0]).toFixed(1)} - ${uiToTmdbVote(
    voteRange[1],
  ).toFixed(1)}`

  return {
    sortBy,
    page,
    selectedGenres,
    voteRange,
    setVoteRange,
    voteLabel,
    genres: genresData?.genres ?? [],
    movies,
    showSkeleton,
    pageCount,
    changePage,
    changeSort,
    toggleGenre,
    resetFilters,
  }
}

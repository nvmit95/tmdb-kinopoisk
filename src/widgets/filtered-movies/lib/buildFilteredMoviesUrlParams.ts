export type FilteredMoviesUrlInput = {
  sortBy: string
  page: number
  voteRange: [number, number]
  genreIds: readonly number[]
}

/** Собирает query для страницы discover; пустой список жанров — ключ `genres` не добавляется. */
export const buildFilteredMoviesUrlParams = (
  input: FilteredMoviesUrlInput,
): Record<string, string> => {
  const next: Record<string, string> = {
    sort_by: input.sortBy,
    page: String(input.page),
    vote_gte: String(input.voteRange[0]),
    vote_lte: String(input.voteRange[1]),
  }
  if (input.genreIds.length > 0) {
    next.genres = input.genreIds.join(",")
  }
  return next
}

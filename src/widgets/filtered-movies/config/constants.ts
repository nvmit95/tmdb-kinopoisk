/** Сколько плейсхолдеров в сетке при загрузке discover */
export const FILTERED_MOVIES_SKELETON_COUNT = 20

/** Задержка синхронизации слайдера рейтинга с URL и API (мс) */
export const FILTERED_VOTE_DEBOUNCE_MS = 200

export const FILTERED_DEFAULTS = {
  sortBy: "popularity.desc",
  // UI rating range: 0..100 (percent-like), converted to TMDB vote_average 0..10
  voteRange: [0, 100] as [number, number],
  genres: [] as number[],
  page: 1,
} as const

export const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Popularity ↓" },
  { value: "popularity.asc", label: "Popularity ↑" },
  { value: "vote_average.desc", label: "Rating ↓" },
  { value: "vote_average.asc", label: "Rating ↑" },
  { value: "primary_release_date.desc", label: "Release date ↓" },
  { value: "primary_release_date.asc", label: "Release date ↑" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
] as const

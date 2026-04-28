export type TmdbMovie = {
  id: number
  title: string
  original_title?: string
  overview?: string
  backdrop_path: string | null
  poster_path?: string | null
  release_date?: string
  vote_average?: number
}

export type TmdbMovieDetails = TmdbMovie & {
  tagline?: string
  runtime?: number | null
  status?: string
  vote_count?: number
  genres?: { id: number; name: string }[]
  imdb_id?: string | null
  homepage?: string | null
}

export type TmdbCastMember = {
  id: number
  /** Уникален в рамках ответа credits (для `key` в списке). */
  credit_id?: string
  name: string
  character?: string
  profile_path?: string | null
  order?: number
}

export type TmdbMovieCredits = {
  id: number
  cast: TmdbCastMember[]
  crew?: unknown[]
}

export type TmdbPagedResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type MovieCategoryList =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing"

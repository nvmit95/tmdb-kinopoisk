import type { MovieCategoryList } from "../model/types"

/** Пары «категория API → подпись в UI» для списков `/movie/{category}` TMDB. */
export const MOVIE_CATEGORY_TABS: {
  category: MovieCategoryList
  label: string
}[] = [
  { category: "popular", label: "Popular Movies" },
  {
    category: "top_rated",
    label: "Top Rated Movies",
  },
  {
    category: "upcoming",
    label: "Upcoming Movies",
  },
  {
    category: "now_playing",
    label: "Now Playing Movies",
  },
]

/** Один элемент из `MOVIE_CATEGORY_TABS` (категория + текст заголовка). */
export type MovieCategoryTabMeta = (typeof MOVIE_CATEGORY_TABS)[number]

/**
 * Возвращает метаданные вкладки для категории или `undefined`, если в таблице нет строки
 * (например, забыли добавить вкладку при расширении типа `MovieCategoryList`).
 */
export function getMovieCategoryTabMeta(
  category: MovieCategoryList,
): MovieCategoryTabMeta | undefined {
  return MOVIE_CATEGORY_TABS.find((t) => t.category === category)
}

/** Допустимые значения `category` из URL (должны совпадать с `MovieCategoryList`). */
const ALLOWED = new Set<MovieCategoryList>([
  "popular",
  "top_rated",
  "upcoming",
  "now_playing",
])

/**
 * Валидирует строку из query (например `?category=popular`) через множество `ALLOWED`.
 * Возвращает `MovieCategoryList` или `null`, если параметр пустой или не из белого списка.
 */
export function parseMovieCategoryParam(
  value: string | null,
): MovieCategoryList | null {
  if (!value) return null
  return ALLOWED.has(value as MovieCategoryList)
    ? (value as MovieCategoryList)
    : null
}
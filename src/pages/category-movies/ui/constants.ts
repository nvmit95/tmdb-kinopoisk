import type { MovieCategoryList } from "@/entities/movie/api/moviesApi"

export {
  buildPaginationItems,
  TMDB_MAX_PAGE,
  type PaginationItem,
} from "@/shared/utils/pagination"

export const CATEGORY_DEFAULT: MovieCategoryList = "popular"


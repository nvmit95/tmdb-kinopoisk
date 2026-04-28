import { PageNotFound } from "@/pages/not-found/ui/PageNotFound"
import { Path } from "@/shared/config/paths"
import { CategoryMoviesPage } from "@/pages/category-movies/ui/CategoryMoviesPage"
import { FavoritesPage } from "@/pages/favorites/ui/FavoritesPage"
import { FilteredMoviesPage } from "@/pages/filtered-movies/ui/FilteredMoviesPage"
import { MainPage } from "@/pages/main/ui/MainPage"
import { MovieDetailsPage } from "@/pages/movie-details/ui/MovieDetailsPage"
import { SearchPage } from "@/pages/search/ui/SearchPage"
import { Route, Routes } from "react-router"

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<MainPage />} />
      <Route path={Path.CategoryMovies} element={<CategoryMoviesPage />} />
      <Route path={Path.Movie} element={<MovieDetailsPage />} />
      <Route path={Path.FilteredMovies} element={<FilteredMoviesPage />} />
      <Route path={Path.Search} element={<SearchPage />} />
      <Route path={Path.Favorites} element={<FavoritesPage />} />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}

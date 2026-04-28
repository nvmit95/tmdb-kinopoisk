import type { MovieCategoryList } from "@/entities/movie/model/types"
import { Path } from "@/shared/config/paths"
import { MovieCategoryPreviewSection } from "./movie-category-preview-section/MovieCategoryPreviewSection"
import { WelcomeBlock } from "./welcome-block/WelcomeBlock"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { MAIN_PAGE_SX } from "./MainPage.styles"

const categoryViewMore = (category: MovieCategoryList) =>
  `${Path.CategoryMovies}?category=${category}`

export const MainPage = () => {
  return (
    <Box component="main" sx={MAIN_PAGE_SX.main}>
      <Stack sx={MAIN_PAGE_SX.stack}>
        <WelcomeBlock />
        <MovieCategoryPreviewSection
          category="popular"
          viewMoreTo={categoryViewMore("popular")}
          labelledById="popular-movies-heading"
        />
        <MovieCategoryPreviewSection
          category="top_rated"
          viewMoreTo={categoryViewMore("top_rated")}
          labelledById="top-rated-movies-heading"
        />
        <MovieCategoryPreviewSection
          category="upcoming"
          viewMoreTo={categoryViewMore("upcoming")}
          labelledById="upcoming-movies-heading"
        />
        <MovieCategoryPreviewSection
          category="now_playing"
          viewMoreTo={categoryViewMore("now_playing")}
          labelledById="now-playing-movies-heading"
        />
      </Stack>
    </Box>
  )
}

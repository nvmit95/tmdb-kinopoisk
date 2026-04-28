import {
  FILTERED_MOVIES_PAGE_LAYOUT_SX,
  FilteredMoviesResults,
  FilteredMoviesSidebar,
  useFilteredMoviesPage,
} from "@/widgets/filtered-movies"
import { PAGE_LAYOUT_SX } from "@/shared/styles"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { FILTERED_MOVIES_PAGE_SX } from "./FilteredMoviesPage.styles"

export const FilteredMoviesPage = () => {
  const layoutSx = PAGE_LAYOUT_SX
  const pageLayoutSx = FILTERED_MOVIES_PAGE_LAYOUT_SX

  const {
    sortBy,
    selectedGenres,
    voteRange,
    setVoteRange,
    voteLabel,
    genres,
    movies,
    showSkeleton,
    pageCount,
    page,
    changePage,
    changeSort,
    toggleGenre,
    resetFilters,
  } = useFilteredMoviesPage()

  return (
    <Box component="main" sx={layoutSx.root}>
      <Container
        maxWidth="lg"
        disableGutters
        sx={FILTERED_MOVIES_PAGE_SX.container}
      >
        <Box sx={pageLayoutSx.layout}>
          <FilteredMoviesSidebar
            sortBy={sortBy}
            voteRange={voteRange}
            setVoteRange={setVoteRange}
            voteLabel={voteLabel}
            genres={genres}
            selectedGenres={selectedGenres}
            onSortChange={changeSort}
            onToggleGenre={toggleGenre}
            onReset={resetFilters}
          />

          <FilteredMoviesResults
            movies={movies}
            showSkeleton={showSkeleton}
            page={page}
            pageCount={pageCount}
            onPageChange={changePage}
            postersGridSx={layoutSx.postersGrid}
          />
        </Box>
      </Container>
    </Box>
  )
}

import type { TmdbGenre } from "@/entities/genre/model/types"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import type { Dispatch, SetStateAction } from "react"
import { SORT_OPTIONS } from "../config/constants"
import { uiToTmdbVote } from "../lib/voteRange"
import { FILTERED_MOVIES_SIDEBAR_SX } from "./FilteredMoviesSidebar.styles"
import { filteredMoviesSortSelectMenuProps } from "./sortSelectMenuProps"

type Props = {
  sortBy: string
  voteRange: [number, number]
  setVoteRange: Dispatch<SetStateAction<[number, number]>>
  voteLabel: string
  genres: TmdbGenre[]
  selectedGenres: number[]
  onSortChange: (sortBy: string) => void
  onToggleGenre: (genreId: number) => void
  onReset: () => void
}

export const FilteredMoviesSidebar = ({
  sortBy,
  voteRange,
  setVoteRange,
  voteLabel,
  genres,
  selectedGenres,
  onSortChange,
  onToggleGenre,
  onReset,
}: Props) => {
  const sx = FILTERED_MOVIES_SIDEBAR_SX

  return (
    <Box sx={(theme) => sx.sidebar(theme)}>
      <Typography sx={sx.sidebarTitle}>Filters / Sort</Typography>

      <Box sx={sx.sortSection}>
        <Typography sx={sx.sortLabel}>{"Sort\nby"}</Typography>
        <FormControl fullWidth size="small" sx={sx.sortSelect}>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(String(e.target.value))}
            MenuProps={filteredMoviesSortSelectMenuProps}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={sx.rating}>
        <Box sx={sx.ratingRow}>
          <Typography sx={sx.ratingLabel}>Rating</Typography>
          <Typography sx={sx.ratingRange}>{voteLabel}</Typography>
        </Box>
        <Box sx={sx.sliderWrap}>
          <Slider
            value={voteRange}
            onChange={(_, value) => {
              if (Array.isArray(value) && value.length === 2) {
                setVoteRange([value[0], value[1]])
              }
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => uiToTmdbVote(Number(v)).toFixed(1)}
            min={0}
            max={100}
            step={1}
            disableSwap
            sx={sx.slider}
          />
        </Box>
      </Box>

      <Box>

        <Box sx={sx.genreButtons}>
          {genres.map((g) => {
            const isActive = selectedGenres.includes(g.id)
            return (
              <Button
                key={g.id}
                variant="outlined"
                onClick={() => onToggleGenre(g.id)}
                sx={(theme) => sx.genreButton(theme, isActive)}
              >
                {g.name}
              </Button>
            )
          })}
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={onReset}
        sx={(theme) => sx.resetButton(theme)}
      >
        Reset filters
      </Button>
    </Box>
  )
}

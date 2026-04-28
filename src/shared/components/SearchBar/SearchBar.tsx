import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import type { SxProps, Theme } from "@mui/material/styles"
import type { FormEventHandler } from "react"
import { SEARCH_BAR_SX } from "./SearchBar.styles"

type Props = {
  value: string
  onValueChange: (value: string) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  placeholder?: string
  disabled?: boolean
  inputSx?: SxProps<Theme>
  buttonSx?: SxProps<Theme>
  maxWidth?: number | string
}

export const SearchBar = ({
  value,
  onValueChange,
  onSubmit,
  placeholder = "Search for a movie",
  disabled,
  inputSx,
  buttonSx,
  maxWidth,
}: Props) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={SEARCH_BAR_SX.form(maxWidth)}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <TextField
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          fullWidth
          variant="outlined"
          type="search"
          slotProps={{
            input: {
              sx: inputSx,
            },
          }}
        />
        <Button
          type="submit"
          disabled={disabled}
          variant="contained"
          sx={buttonSx}
        >
          Search
        </Button>
      </Stack>
    </Box>
  )
}


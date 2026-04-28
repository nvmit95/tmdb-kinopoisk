import { useGetMovieCategoryListQuery } from "@/entities/movie/api/moviesApi"
import { Path } from "@/shared/config/paths"
import { SearchBar } from "@/shared/components"
import { TMDB_IMAGE_ORIGINAL, WELCOME_BLOCK_SX } from "./WelcomeBlock.styles"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { type FormEventHandler, useMemo, useState } from "react"
import { useNavigate } from "react-router"

export const WelcomeBlock = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const { data, isLoading, isFetching } = useGetMovieCategoryListQuery({
    category: "popular",
    page: 1,
  })

  const showSkeleton = isLoading || (isFetching && !data)

  const backdropUrl = useMemo(() => {
    const valid = data?.results?.filter((m) => m.backdrop_path)
    if (!valid?.length) return
    const random = valid[Math.floor(Math.random() * valid.length)]
    return `${TMDB_IMAGE_ORIGINAL}${random.backdrop_path}`
  }, [data?.results])

  const isDisabled = !query.trim()

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (isDisabled) return
    navigate(`${Path.Search}?query=${encodeURIComponent(query.trim())}`)
  }

  return (
    <Box
      component="section"
      sx={(theme) => WELCOME_BLOCK_SX.section(theme, backdropUrl)}
    >
      {showSkeleton && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={WELCOME_BLOCK_SX.skeletonOverlay}
        />
      )}
      <Container maxWidth="lg" disableGutters sx={WELCOME_BLOCK_SX.container}>
        <Stack sx={WELCOME_BLOCK_SX.content}>
          <Typography
            variant="h1"
            component="h1"
            sx={(theme) => WELCOME_BLOCK_SX.title(theme)}
          >
            {showSkeleton ? <Skeleton width={220} /> : "WELCOME"}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            sx={(theme) => WELCOME_BLOCK_SX.subtitle(theme)}
          >
            {showSkeleton ? <Skeleton width={320} /> : "Browse highlighted titles from TMDB"}
          </Typography>

          <SearchBar
            value={query}
            onValueChange={setQuery}
            onSubmit={onSubmit}
            placeholder="Search for a movie"
            disabled={isDisabled}
            inputSx={(theme) => WELCOME_BLOCK_SX.input(theme)}
            buttonSx={(theme) => WELCOME_BLOCK_SX.button(theme)}
          />
        </Stack>
      </Container>
    </Box>
  )
}

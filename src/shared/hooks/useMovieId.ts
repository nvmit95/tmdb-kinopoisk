import { useParams } from "react-router"

export const useMovieId = () => {
  const { movieId } = useParams<{ movieId: string }>()

  const id = Number(movieId)

  return Number.isFinite(id) && id > 0 ? id : null
}

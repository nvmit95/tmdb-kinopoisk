import type { FavoriteMovieStub } from "@/entities/favorites/model/favorites-slice"
import { toggleFavoriteAC } from "@/entities/favorites/model/favorites-slice"
import { useAppDispatch } from "@/shared/hooks"

export const useToggleFavoriteMovie = () => {
  const dispatch = useAppDispatch()
  return (movie: FavoriteMovieStub) => dispatch(toggleFavoriteAC(movie))
}


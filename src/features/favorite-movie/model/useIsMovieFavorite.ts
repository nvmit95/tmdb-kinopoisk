import { selectIsMovieFavorite } from "@/entities/favorites/model/favorites-slice"
import { useAppSelector } from "@/shared/hooks"

export const useIsMovieFavorite = (movieId: number) => {
  return useAppSelector(selectIsMovieFavorite(movieId))
}


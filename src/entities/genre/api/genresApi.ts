import { baseApi } from "@/shared/api/baseApi"
import type { TmdbGenresResponse } from "../model/types"
import { tmdbGenresResponseSchema } from "../model/schemas"

export const genresApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMovieGenres: build.query<TmdbGenresResponse, { language?: string } | void>({
      query: (arg) => ({
        url: "/genre/movie/list",
        params: {
          language: arg && "language" in arg ? arg.language : undefined,
        },
      }),
      extraOptions: { responseSchema: tmdbGenresResponseSchema },
    }),
  }),
})

export const { useGetMovieGenresQuery } = genresApi


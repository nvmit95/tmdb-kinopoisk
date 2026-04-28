import { baseApi } from "@/shared/api/baseApi"
import type {
  MovieCategoryList,
  TmdbMovieCredits,
  TmdbMovie,
  TmdbMovieDetails,
  TmdbPagedResponse,
} from "../model/types"
import {
  tmdbMovieDetailsSchema,
  tmdbMovieSchema,
  tmdbPagedResponseSchema,
} from "../model/schemas"

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMovieCategoryList: build.query<
      TmdbPagedResponse<TmdbMovie>,
      { category: MovieCategoryList; page?: number }
    >({
      query: ({ category, page = 1 }) => ({
        url: `/movie/${category}`,
        params: { page },
      }),
      extraOptions: {
        responseSchema: tmdbPagedResponseSchema(tmdbMovieSchema),
      },
    }),
    getMovieDetails: build.query<TmdbMovieDetails, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
      }),
      extraOptions: { responseSchema: tmdbMovieDetailsSchema },
    }),
    getMovieCredits: build.query<TmdbMovieCredits, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
      }),
    }),
    getSimilarMovies: build.query<TmdbPagedResponse<TmdbMovie>, { movieId: number; page?: number }>({
      query: ({ movieId, page = 1 }) => ({
        url: `/movie/${movieId}/similar`,
        params: { page },
      }),
      extraOptions: {
        responseSchema: tmdbPagedResponseSchema(tmdbMovieSchema),
      },
    }),
    searchMovies: build.query<
      TmdbPagedResponse<TmdbMovie>,
      { query: string; page?: number; include_adult?: boolean }
    >({
      query: ({ query, page = 1, include_adult = false }) => ({
        url: "/search/movie",
        params: {
          query,
          page,
          include_adult,
        },
      }),
      extraOptions: {
        responseSchema: tmdbPagedResponseSchema(tmdbMovieSchema),
      },
    }),
    discoverMovies: build.query<
      TmdbPagedResponse<TmdbMovie>,
      {
        page?: number
        sort_by?: string
        vote_average_gte?: number
        vote_average_lte?: number
        with_genres?: string
      }
    >({
      query: ({
        page = 1,
        sort_by,
        vote_average_gte,
        vote_average_lte,
        with_genres,
      }) => ({
        url: "/discover/movie",
        params: {
          page,
          sort_by,
          "vote_average.gte": vote_average_gte,
          "vote_average.lte": vote_average_lte,
          with_genres,
        },
      }),
      extraOptions: {
        responseSchema: tmdbPagedResponseSchema(tmdbMovieSchema),
      },
    }),
  }),
})

export const {
  useGetMovieCategoryListQuery,
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useSearchMoviesQuery,
  useDiscoverMoviesQuery,
} = moviesApi

export type {
  MovieCategoryList,
  TmdbMovie,
  TmdbMovieCredits,
  TmdbMovieDetails,
  TmdbPagedResponse,
} from "../model/types"

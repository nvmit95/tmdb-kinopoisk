import { z } from "zod"

export const tmdbGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const tmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string().optional(),
  overview: z.string().optional(),
  backdrop_path: z.string().nullable(),
  poster_path: z.string().nullable().optional(),
  release_date: z.string().optional(),
  vote_average: z.number().optional(),
})

export const tmdbMovieDetailsSchema = tmdbMovieSchema.extend({
  tagline: z.string().optional(),
  runtime: z.number().nullable().optional(),
  status: z.string().optional(),
  vote_count: z.number().optional(),
  genres: z.array(tmdbGenreSchema).optional(),
  imdb_id: z.string().nullable().optional(),
  homepage: z.string().nullable().optional(),
})

export const tmdbCastMemberSchema = z.object({
  id: z.number(),
  credit_id: z.string().optional(),
  name: z.string(),
  character: z.string().optional(),
  profile_path: z.string().nullable().optional(),
  order: z.number().optional(),
})

export const tmdbMovieCreditsSchema = z.object({
  id: z.number(),
  cast: z.array(tmdbCastMemberSchema),
  crew: z.array(z.unknown()).optional(),
})

export const tmdbPagedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    page: z.coerce.number(),
    results: z.array(itemSchema),
    total_pages: z.coerce.number(),
    total_results: z.coerce.number(),
  })


import { z } from "zod"

export const tmdbGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const tmdbGenresResponseSchema = z.object({
  genres: z.array(tmdbGenreSchema),
})


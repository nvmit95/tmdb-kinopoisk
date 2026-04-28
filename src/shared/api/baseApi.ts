import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "@/shared/utils"
import type { ZodTypeAny } from "zod"
import { ZodError } from "zod"
import type {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query"

type BaseApiExtraOptions = {
  responseSchema?: ZodTypeAny
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,

  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`)
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: "tmdbKinopoiskApi",

  tagTypes: ["Todolist", "Task"],

  refetchOnFocus: true,
  refetchOnReconnect: true,

  baseQuery: async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions)
    let finalResult: typeof result | QueryReturnValue<never, FetchBaseQueryError, FetchBaseQueryMeta> =
      result

    const { responseSchema } = (extraOptions ?? {}) as BaseApiExtraOptions
    if (responseSchema && result.data) {
      try {
        result.data = responseSchema.parse(result.data)
      } catch (e) {
        const message =
          e instanceof ZodError
            ? `Response validation error (${api.endpoint}): ${e.issues
                .map((i) => `${i.path.join(".") || "<root>"}: ${i.message}`)
                .join("; ")}`
            : `Response validation error (${api.endpoint})`

        // Превращаем ошибки валидации в "CUSTOM_ERROR".
        // Важно: возвращаем ошибку (а не data), чтобы UI/кэш RTK Query не работал с невалидной структурой.
        finalResult = {
          error: { status: "CUSTOM_ERROR", error: message } as FetchBaseQueryError,
        }
      }
    }

    handleError(api, finalResult as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>)

    return finalResult
  },

  endpoints: () => ({}),
})

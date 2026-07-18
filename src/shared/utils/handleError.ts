import { setAppErrorAC } from "@/app/app-slice"
import { isErrorWithMessage } from "./isErrorWithMessage"
import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query/react"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error occurred"

  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR": {
        const rawError =
          typeof result.error.error === "string" ? result.error.error : ""

        // Навигация / смена аргументов / unmount — не показываем как ошибку сети
        if (result.error.status === "FETCH_ERROR" && /abort/i.test(rawError)) {
          return
        }

        // FETCH_ERROR часто выглядит как "TypeError: Failed to fetch"
        // (блок API, CORS, краткий обрыв), при этом кэш RTK Query может уже
        // отдавать данные — поэтому не виним только «интернет».
        if (
          result.error.status === "FETCH_ERROR" &&
          /failed to fetch|networkerror|load failed/i.test(rawError)
        ) {
          error =
            "Couldn't reach TMDB API. Please try again in a moment."
        } else {
          error = rawError || "Some error occurred"
        }
        break
      }
      case 401:
        error = "401 Unauthorized. Invalid API key."
        break
      case 403:
        error = "403 Forbidden Error. Check API-KEY"
        break
      case 404:
        error = "404 Not Found. Check endpoint URL."
        break
      case 400:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message
        } else {
          error = JSON.stringify(result.error.data)
        }
        break
      default:
        if (
          typeof result.error.status === "number" &&
          result.error.status >= 500 &&
          result.error.status < 600
        ) {
          error = "Server error occurred. Please try again later."
        } else {
          error = JSON.stringify(result.error)
        }
        break
    }
    api.dispatch(setAppErrorAC({ error }))
    return
  }
}
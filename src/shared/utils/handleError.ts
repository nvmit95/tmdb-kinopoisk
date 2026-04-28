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
      case "CUSTOM_ERROR":
        // FETCH_ERROR часто выглядит как "TypeError: Failed to fetch"
        if (
          result.error.status === "FETCH_ERROR" &&
          typeof result.error.error === "string" &&
          /failed to fetch|networkerror|load failed/i.test(result.error.error)
        ) {
          error = "Network error. Check your internet connection."
        } else {
          error = result.error.error
        }
        break
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
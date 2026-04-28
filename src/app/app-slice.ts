import type { RequestStatus, ThemeMode } from "@/shared/types/types"

import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { loadThemeMode, persistThemeMode } from "@/app/lib/themeModeStorage"

export type { ThemeMode }

const initialState = {
  themeMode: loadThemeMode(),
  status: "idle" as RequestStatus,
  error: null as string | null,
}

type AppSliceState = typeof initialState

export const appSlice = createSlice({
  name: "app",
  initialState,
  selectors: {
    selectThemeMode: (state: AppSliceState) => state.themeMode,
    selectAppStatus: (state: AppSliceState) => state.status,
    selectAppError: (state: AppSliceState) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>(
      (state, action) => {
        state.themeMode = action.payload.themeMode
        persistThemeMode(action.payload.themeMode)
      },
    ),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>(
      (state, action) => {
        state.status = action.payload.status
      },
    ),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const { selectThemeMode, selectAppStatus, selectAppError } =
  appSlice.selectors
export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC } =
  appSlice.actions
export const appReducer = appSlice.reducer

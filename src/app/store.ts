import {
  favoritesReducer,
  favoritesSlice,
} from "@/entities/favorites/model/favorites-slice"
import "@/entities/movie/api/moviesApi"
import { baseApi } from "@/shared/api/baseApi"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { appReducer, appSlice } from "./app-slice.ts"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [favoritesSlice.name]: favoritesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store

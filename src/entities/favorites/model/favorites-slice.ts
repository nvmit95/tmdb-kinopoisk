import { createSlice } from "@reduxjs/toolkit"

const STORAGE_KEY = "tmdb-kinopoisk-favorites"

/** Поля как в задании: id, title, posterUrl, voteAverage. `posterUrl` — относительный путь постера TMDB (`poster_path` API). */
export type FavoriteMovieStub = {
  id: number
  title: string
  posterUrl: string | null
  voteAverage?: number
}

type FavoritesState = {
  byId: Record<number, FavoriteMovieStub>
}

type LegacyFavoriteRow = {
  id?: unknown
  title?: unknown
  posterUrl?: unknown
  poster_path?: unknown
  voteAverage?: unknown
  vote_average?: unknown
}

function normalizeFavoriteRow(raw: unknown): FavoriteMovieStub | null {
  if (!raw || typeof raw !== "object") return null
  const o = raw as LegacyFavoriteRow
  const id = typeof o.id === "number" ? o.id : Number(o.id)
  if (!Number.isFinite(id)) return null
  const title = typeof o.title === "string" ? o.title : ""
  const posterUrl =
    typeof o.posterUrl === "string"
      ? o.posterUrl
      : typeof o.poster_path === "string"
        ? o.poster_path
        : null
  const voteAverage =
    typeof o.voteAverage === "number"
      ? o.voteAverage
      : typeof o.vote_average === "number"
        ? o.vote_average
        : undefined
  return { id, title, posterUrl, voteAverage }
}

function loadState(): FavoritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    //raw - сырые, необработанные данные
    if (!raw) return { byId: {} }
    const parsed = JSON.parse(raw) as unknown
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("byId" in parsed) ||
      typeof (parsed as FavoritesState).byId !== "object"
    ) {
      return { byId: {} }
    }
    const rawById = (parsed as { byId: Record<string, unknown> }).byId
    const byId: Record<number, FavoriteMovieStub> = {}
    let needsMigrate = raw.includes('"poster_path"') || raw.includes('"vote_average"')
    for (const value of Object.values(rawById)) {
      const row = normalizeFavoriteRow(value)
      if (row) {
        if (
          value &&
          typeof value === "object" &&
          ("poster_path" in value || "vote_average" in value)
        ) {
          needsMigrate = true
        }
        byId[row.id] = row
      }
    }
    if (needsMigrate && Object.keys(byId).length > 0) {
      persist(byId)
    }
    return { byId }
  } catch {
    return { byId: {} }
  }
}

function persist(byId: Record<number, FavoriteMovieStub>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ byId }))
}

const initialState = loadState()

type FavoritesSliceState = typeof initialState

type StateWithFavorites = { favorites: FavoritesSliceState }

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  selectors: {
    selectFavoritesById: (state: FavoritesSliceState) => state.byId,
    selectFavoritesList: (state: FavoritesSliceState) =>
      Object.values(state.byId),
  },
  reducers: (create) => ({
    toggleFavoriteAC: create.reducer<FavoriteMovieStub>((state, action) => {
      const { id } = action.payload
      if (state.byId[id]) {
        delete state.byId[id]
      } else {
        state.byId[id] = action.payload
      }
      persist(state.byId)
    }),
  }),
})

export const { selectFavoritesById, selectFavoritesList } =
  favoritesSlice.selectors

export const selectIsMovieFavorite =
  (movieId: number) => (state: StateWithFavorites) =>
    Boolean(state.favorites.byId[movieId])

export const { toggleFavoriteAC } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer

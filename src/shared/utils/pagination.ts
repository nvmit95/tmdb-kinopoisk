export const TMDB_MAX_PAGE = 500

export type PaginationItem = number | "ellipsis"

export const buildPaginationItems = (
  page: number,
  lastPage: number,
): PaginationItem[] => {
  if (lastPage <= 1) return [1]
  if (lastPage <= 4) return Array.from({ length: lastPage }, (_, i) => i + 1)

  if (page === 1) return [1, 2, "ellipsis", lastPage]

  if (page === 2) return [1, 2, 3, "ellipsis", lastPage]

  if (page === 3) return [1, 2, 3, 4, "ellipsis", lastPage]

  if (page === lastPage) return [1, "ellipsis", lastPage - 2, lastPage - 1, lastPage]
  if (page === lastPage - 1) return [1, "ellipsis", lastPage - 2, lastPage - 1, lastPage]
  if (page === lastPage - 2) {
    return [1, "ellipsis", lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
  }

  const raw: PaginationItem[] = [
    1,
    "ellipsis",
    page - 1,
    page,
    page + 1,
    "ellipsis",
    lastPage,
  ]

  const cleaned: PaginationItem[] = []
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i]
    if (item !== "ellipsis") {
      cleaned.push(item)
      continue
    }
    const prev = cleaned[cleaned.length - 1]
    const next = raw[i + 1]
    if (typeof prev === "number" && typeof next === "number" && next - prev <= 1) {
      continue
    }
    cleaned.push(item)
  }

  return cleaned
}

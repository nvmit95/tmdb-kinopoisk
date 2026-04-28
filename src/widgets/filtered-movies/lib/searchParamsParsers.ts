export const parseIntList = (value: string | null): number[] => {
  if (!value) return []
  return value
    .split(",")
    .map((x) => Number(x.trim()))
    .filter((x) => Number.isFinite(x) && x > 0)
}

export const parseNumber = (value: string | null, fallback: number) => {
  if (value === null || value.trim() === "") return fallback
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

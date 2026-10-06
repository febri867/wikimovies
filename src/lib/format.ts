export const imageUrl = (
  path: string | null,
  size: 'w342' | 'w500' | 'w780' | 'original' = 'w500',
) =>
  path
    ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p'}/${size}${path}`
    : '';
export const year = (date: string) =>
  date ? new Date(`${date}T00:00:00`).getFullYear().toString() : '—';
export const rating = (value: number) => (value > 0 ? value.toFixed(1) : 'N/A');
export const runtime = (minutes: number | null) =>
  minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : '—';

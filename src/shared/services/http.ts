import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL ?? 'https://api.themoviedb.org/3',
  timeout: 12000,
  params: {
    language: 'en-US',
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

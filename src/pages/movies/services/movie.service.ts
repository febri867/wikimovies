import type {
  AutocompleteResult,
  MovieCategory,
  MovieDetails,
  PaginatedMovies,
} from '@/pages/movies/entities/movie';
import { mapMovie, mapMovieDetails } from '@/pages/movies/entities/movie.mapper';
import type { TmdbDetails, TmdbPage } from '@/pages/movies/services/tmdb.types';
import { http } from '@/shared/services/http';

const endpoints: Record<MovieCategory, string> = {
  now_playing: '/movie/now_playing',
  popular: '/movie/popular',
  top_rated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
};

const fetchPage = async (
  path: string,
  page: number,
  query?: string,
  signal?: AbortSignal,
): Promise<TmdbPage> => {
  const { data } = await http.get<TmdbPage>(path, { params: { page, query }, signal });
  return data;
};

export const getMovies = async (
  category: MovieCategory,
  page: number,
  query: string,
  signal?: AbortSignal,
): Promise<PaginatedMovies> => {
  const trimmed = query.trim();
  const response = await fetchPage(
    trimmed ? '/search/movie' : endpoints[category],
    page,
    trimmed || undefined,
    signal,
  );
  return {
    movies: response.results.map(mapMovie),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
};

export const searchMovies = async (
  query: string,
  signal?: AbortSignal,
): Promise<AutocompleteResult> => {
  const trimmed = query.trim();
  if (!trimmed) return { movies: [], query: '' };
  const response = await fetchPage('/search/movie', 1, trimmed, signal);
  return { movies: response.results.slice(0, 8).map(mapMovie), query: trimmed };
};

export const getMovieDetails = async (id: number, signal?: AbortSignal): Promise<MovieDetails> => {
  const { data } = await http.get<TmdbDetails>(`/movie/${id}`, {
    signal,
    params: {
      append_to_response: 'credits,videos,recommendations,similar,watch/providers,images',
    },
  });
  return mapMovieDetails(data);
};

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMovieDetails, getMovies, searchMovies } from '@/pages/movies/services/movie.service';
import type { MovieCategory } from '@/pages/movies/entities/movie';

export const useMovies = (category: MovieCategory, query: string) =>
  useInfiniteQuery({
    queryKey: ['movies', category, query],
    initialPageParam: 1,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam, signal }) => getMovies(category, pageParam, query, signal),
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
  });

export const useMovieSearch = (query: string) =>
  useQuery({
    queryKey: ['movie-search', query],
    queryFn: ({ signal }) => searchMovies(query, signal),
    enabled: query.trim().length >= 2,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ['movie', id],
    enabled: Number.isInteger(id) && id > 0,
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    queryFn: ({ signal }) => getMovieDetails(id, signal),
    refetchOnWindowFocus: false,
  });

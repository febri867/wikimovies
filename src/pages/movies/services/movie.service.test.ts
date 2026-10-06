import { beforeEach, describe, expect, it, vi } from 'vitest';
import { http } from '@/shared/services/http';
import { getMovieDetails, getMovies, searchMovies } from './movie.service';

const movie = {
  id: 1,
  title: 'Demo',
  overview: 'A demo movie',
  release_date: '2026-01-01',
  poster_path: null,
  backdrop_path: null,
  vote_average: 8,
  vote_count: 1,
  popularity: 1,
  genre_ids: [],
  original_language: 'en',
};

describe('movie service', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('loads a category page and returns application entities', async () => {
    vi.spyOn(http, 'get').mockResolvedValueOnce({
      data: { page: 1, results: [movie], total_pages: 2, total_results: 2 },
    } as never);

    await expect(getMovies('popular', 1, '')).resolves.toMatchObject({
      movies: [{ id: 1, title: 'Demo' }],
      page: 1,
      totalPages: 2,
    });
  });

  it('switches to search when a query exists', async () => {
    const spy = vi.spyOn(http, 'get').mockResolvedValueOnce({
      data: { page: 1, results: [movie], total_pages: 1, total_results: 1 },
    } as never);

    await getMovies('popular', 1, ' batman ');
    expect(spy).toHaveBeenCalledWith(
      '/search/movie',
      expect.objectContaining({ params: expect.objectContaining({ query: 'batman' }) }),
    );
  });

  it('returns autocomplete suggestions capped to eight results', async () => {
    vi.spyOn(http, 'get').mockResolvedValueOnce({
      data: {
        page: 1,
        results: Array.from({ length: 10 }, (_, index) => ({ ...movie, id: index + 1 })),
        total_pages: 1,
        total_results: 10,
      },
    } as never);

    const result = await searchMovies('bat');
    expect(result.query).toBe('bat');
    expect(result.movies).toHaveLength(8);
    expect(result.movies[0]).toMatchObject({ id: 1 });
  });

  it('short-circuits blank autocomplete input', async () => {
    const spy = vi.spyOn(http, 'get');
    await expect(searchMovies(' ')).resolves.toEqual({ movies: [], query: '' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('loads details with aggregated TMDB resources', async () => {
    const spy = vi.spyOn(http, 'get').mockResolvedValueOnce({
      data: {
        ...movie,
        runtime: 100,
        status: 'Released',
        tagline: 'Demo',
        genres: [],
        credits: { cast: [], crew: [] },
        videos: { results: [] },
        recommendations: { page: 1, results: [], total_pages: 1, total_results: 0 },
        similar: { page: 1, results: [], total_pages: 1, total_results: 0 },
        'watch/providers': { results: {} },
      },
    } as never);

    await expect(getMovieDetails(1)).resolves.toMatchObject({ id: 1, runtime: 100 });
    expect(spy).toHaveBeenCalledWith(
      '/movie/1',
      expect.objectContaining({
        params: expect.objectContaining({ append_to_response: expect.stringContaining('credits') }),
      }),
    );
  });
});

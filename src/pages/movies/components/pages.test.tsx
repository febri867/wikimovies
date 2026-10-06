import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieListPage } from './MovieListPage';
import { MovieDetailPage } from './MovieDetailPage';
vi.mock('@/pages/movies/components/useMovies', () => ({
  useMovies: () => ({
    data: { pages: [{ movies: [], totalResults: 0 }] },
    isPending: false,
    isError: false,
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: vi.fn(),
    refetch: vi.fn(),
  }),
  useMovieSearch: () => ({ data: { movies: [] }, isFetching: false }),
  useMovieDetails: () => ({ isPending: false, isError: false, data: null, refetch: vi.fn() }),
}));
beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver,
  );
});
describe('pages', () => {
  it('renders empty list state', () => {
    render(
      <MemoryRouter>
        <MovieListPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
  });
  it('renders invalid detail state', () => {
    render(
      <MemoryRouter initialEntries={['/movies/nope']}>
        <MovieDetailPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/movie not found/i)).toBeInTheDocument();
  });
});

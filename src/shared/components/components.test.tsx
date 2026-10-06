import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Poster } from './atoms/Poster';
import { SearchBar } from './molecules/SearchBar';
import { CategoryTabs } from './molecules/CategoryTabs';
import { MovieCard } from './molecules/MovieCard';
import type { MovieSummary } from '@/pages/movies/entities/movie';
const movie: MovieSummary = {
  id: 1,
  title: 'Demo Movie',
  overview: '',
  releaseDate: '2026-01-01',
  posterPath: null,
  backdropPath: null,
  voteAverage: 8,
  voteCount: 2,
  popularity: 1,
  genreIds: [],
  originalLanguage: 'en',
};
describe('components', () => {
  it('renders poster fallback', () => render(<Poster path={null} title="Demo" />));
  it('searches and clears', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn(),
      onClear = vi.fn();
    render(
      <SearchBar
        value="bat"
        suggestions={[]}
        isLoading={false}
        onChange={onChange}
        onSelect={vi.fn()}
        onClear={onClear}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onClear).toHaveBeenCalled();
  });
  it('renders categories and changes active category', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<CategoryTabs active="popular" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Top Rated' }));
    expect(onChange).toHaveBeenCalledWith('top_rated');
  });
  it('renders movie card link', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute(
      'href',
      '/movies/1',
    );
  });
});

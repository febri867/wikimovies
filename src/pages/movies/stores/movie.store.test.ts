import { describe, expect, it } from 'vitest';
import { useMovieUiStore } from './movie.store';
describe('movie ui store', () => {
  it('updates category and resets query', () => {
    useMovieUiStore.setState({ query: 'batman' });
    useMovieUiStore.getState().setCategory('top_rated');
    expect(useMovieUiStore.getState().category).toBe('top_rated');
    expect(useMovieUiStore.getState().query).toBe('');
  });
  it('toggles theme', () => {
    useMovieUiStore.setState({ theme: 'dark' });
    useMovieUiStore.getState().toggleTheme();
    expect(useMovieUiStore.getState().theme).toBe('light');
  });
});

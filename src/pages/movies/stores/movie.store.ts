import { create } from 'zustand';
import type { MovieCategory } from '@/pages/movies/entities/movie';

type Theme = 'dark' | 'light';
interface MovieUiState {
  category: MovieCategory;
  query: string;
  theme: Theme;
  setCategory: (category: MovieCategory) => void;
  setQuery: (query: string) => void;
  toggleTheme: () => void;
}

export const useMovieUiStore = create<MovieUiState>((set) => ({
  category: 'popular',
  query: '',
  theme: 'dark',
  setCategory: (category) => set({ category, query: '' }),
  setQuery: (query) => set({ query }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));

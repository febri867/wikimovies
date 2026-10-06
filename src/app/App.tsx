import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovieListPage } from '@/pages/movies/components/MovieListPage';
import { MovieDetailPage } from '@/pages/movies/components/MovieDetailPage';
import { useMovieUiStore } from '@/pages/movies/stores/movie.store';
import { SplashScreen } from '@/shared/components/atoms/SplashScreen';
import '@/shared/i18n';
import '@/styles/global.css';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1 } } });

const AppShell = () => {
  const theme = useMovieUiStore((state) => state.theme);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen visible={booting} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="*" element={<MovieListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppShell />
  </QueryClientProvider>
);

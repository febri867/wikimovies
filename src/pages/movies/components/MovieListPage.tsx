import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/shared/components/organisms/Header';
import { EmptyState, ErrorState } from '@/shared/components/organisms/States';
import { MovieGrid } from '@/shared/components/organisms/MovieGrid';
import { MovieSkeletonGrid } from '@/shared/components/organisms/MovieSkeletonGrid';
import { Spinner } from '@/shared/components/atoms/Spinner';
import { useInfiniteScroll } from '@/pages/movies/components/useInfiniteScroll';
import { useDebouncedValue } from '@/pages/movies/components/useDebouncedValue';
import { useMovieSearch, useMovies } from '@/pages/movies/components/useMovies';
import { useMovieUiStore } from '@/pages/movies/stores/movie.store';
import { useNavigate } from 'react-router-dom';

export const MovieListPage = () => {
  const { category, query, theme, setCategory, setQuery, toggleTheme } = useMovieUiStore();
  const { t } = useTranslation();
  const [, startTransition] = useTransition();
  const debouncedQuery = useDebouncedValue(query, 350);
  const moviesQuery = useMovies(category, debouncedQuery);
  const suggestionsQuery = useMovieSearch(debouncedQuery);
  const navigate = useNavigate();
  const movies = useMemo(
    () => moviesQuery.data?.pages.flatMap((page) => page.movies) ?? [],
    [moviesQuery.data],
  );
  const loadMore = useCallback(() => {
    if (moviesQuery.hasNextPage && !moviesQuery.isFetchingNextPage)
      void moviesQuery.fetchNextPage();
  }, [moviesQuery.hasNextPage, moviesQuery.isFetchingNextPage, moviesQuery.fetchNextPage]);
  const sentinelRef = useInfiniteScroll(
    Boolean(moviesQuery.hasNextPage) && !moviesQuery.isFetchingNextPage,
    loadMore,
  );
  useEffect(() => {
    document.title = debouncedQuery
      ? `Search · ${debouncedQuery} · WikiMovies`
      : 'WikiMovies · Discover movies';
  }, [debouncedQuery]);
  return (
    <>
      <Header
        category={category}
        query={query}
        suggestions={suggestionsQuery.data?.movies ?? []}
        isSearching={suggestionsQuery.isFetching}
        theme={theme}
        onCategory={(value) => startTransition(() => setCategory(value))}
        onQuery={setQuery}
        onSelect={(movie) => navigate(`/movies/${movie.id}`)}
        onClear={() => setQuery('')}
        onToggleTheme={toggleTheme}
      />
      <main className="container">
        <section className="page-title">
          <div>
            <p className="eyebrow">{t('discover')}</p>
            <h1>
              {debouncedQuery ? t('searchResultsFor', { query: debouncedQuery }) : t(category)}
            </h1>
            <p className="subtitle">{t('curated')}</p>
          </div>
          <span>{t('titles', { count: moviesQuery.data?.pages[0]?.totalResults ?? 0 })}</span>
        </section>
        {moviesQuery.isPending ? (
          <MovieSkeletonGrid />
        ) : moviesQuery.isError ? (
          <ErrorState onRetry={() => void moviesQuery.refetch()} />
        ) : movies.length === 0 ? (
          <EmptyState query={debouncedQuery} />
        ) : (
          <MovieGrid movies={movies} />
        )}
        <div ref={sentinelRef} className="load-more" aria-live="polite">
          {moviesQuery.isFetchingNextPage && <Spinner label="Loading more movies" />}
        </div>
      </main>
    </>
  );
};

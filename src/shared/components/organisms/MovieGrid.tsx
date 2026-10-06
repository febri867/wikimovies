import type { MovieSummary } from '@/pages/movies/entities/movie';
import { MovieCard } from '@/shared/components/molecules/MovieCard';
export const MovieGrid = ({ movies }: { movies: MovieSummary[] }) => (
  <div className="movie-grid">
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
);

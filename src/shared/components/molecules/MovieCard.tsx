import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { MovieSummary } from '@/pages/movies/entities/movie';
import { Poster } from '@/shared/components/atoms/Poster';
import { rating, year } from '@/lib/format';
export const MovieCard = ({ movie }: { movie: MovieSummary }) => (
  <article className="movie-card">
    <Link to={`/movies/${movie.id}`} aria-label={`View details for ${movie.title}`}>
      <div className="poster-wrap">
        <Poster path={movie.posterPath} title={movie.title} />
        <span className="score">
          <Star size={12} fill="currentColor" />
          {rating(movie.voteAverage)}
        </span>
      </div>
      <div className="movie-meta">
        <h3>{movie.title}</h3>
        <div>
          <span>{year(movie.releaseDate)}</span>
          <span>•</span>
          <span>{movie.originalLanguage.toUpperCase()}</span>
        </div>
      </div>
    </Link>
  </article>
);

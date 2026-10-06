import { ArrowLeft, CalendarDays, Clock3, Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useMovieDetails } from '@/pages/movies/components/useMovies';
import { Poster } from '@/shared/components/atoms/Poster';
import { Button } from '@/shared/components/atoms/Button';
import { ErrorState, LoadingState, NotFoundState } from '@/shared/components/organisms/States';
import { MovieGrid } from '@/shared/components/organisms/MovieGrid';
import { TrailerPlayer } from '@/shared/components/organisms/TrailerPlayer';
import { imageUrl, rating, runtime, year } from '@/lib/format';

export const MovieDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const movieId = Number(id);
  const query = useMovieDetails(movieId);
  if (!Number.isInteger(movieId) || movieId <= 0) return <NotFoundState />;
  if (query.isPending) return <LoadingState />;
  if (query.isError) return <ErrorState onRetry={() => void query.refetch()} />;
  if (!query.data) return <NotFoundState />;
  const movie = query.data;
  const director = movie.crew.find((person) => person.job === 'Director');
  const backdrop = movie.backdropPath ? imageUrl(movie.backdropPath, 'original') : '';
  return (
    <main className="detail-page">
      <div
        className="backdrop"
        style={{
          backgroundImage: backdrop
            ? `linear-gradient(90deg,var(--bg) 5%,color-mix(in srgb,var(--bg) 70%,transparent),var(--bg)),url(${backdrop})`
            : undefined,
        }}
      />
      <div className="detail-content">
        <Link to="/">
          <Button className="back">
            <ArrowLeft size={17} />
            {t('backToBrowse')}
          </Button>
        </Link>
        <section className="detail-hero">
          <Poster path={movie.posterPath} title={movie.title} className="detail-poster" />
          <div className="detail-copy">
            <p className="eyebrow">{t('movieDetail')}</p>
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}
            <div className="detail-stats">
              <span>
                <CalendarDays size={15} />
                {year(movie.releaseDate)}
              </span>
              <span>
                <Clock3 size={15} />
                {runtime(movie.runtime)}
              </span>
              <span>
                <Star size={15} fill="currentColor" />
                {rating(movie.voteAverage)}
              </span>
              <span>
                <Users size={15} />
                {t('votes', { count: movie.voteCount.toLocaleString() })}
              </span>
            </div>
            <p className="overview">{movie.overview || t('noSynopsis')}</p>
            <div className="chips">
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
            <p className="director">
              <strong>{t('director')}</strong>
              {director?.name ?? t('notAvailable')}
            </p>
            {movie.providers.length > 0 && (
              <p className="director">
                <strong>{t('streaming')}</strong>
                {movie.providers
                  .slice(0, 4)
                  .map((provider) => provider.providerName)
                  .join(' · ')}
              </p>
            )}
          </div>
        </section>
        <TrailerPlayer videos={movie.videos} />
        <section className="cast">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t('cast')}</p>
              <h2>{t('meetCast')}</h2>
            </div>
          </div>
          <div className="cast-grid">
            {movie.cast.slice(0, 8).map((person) => (
              <div key={person.id} className="cast-item">
                {person.profilePath ? (
                  <img
                    src={imageUrl(person.profilePath, 'w342')}
                    alt={person.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="cast-empty" aria-hidden="true" />
                )}
                <div>
                  <strong>{person.name}</strong>
                  <span>{person.character}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        {movie.recommendations.length > 0 && (
          <section className="recommendations">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t('forYou')}</p>
                <h2>{t('moreLikeThis')}</h2>
              </div>
            </div>
            <MovieGrid movies={movie.recommendations.slice(0, 6)} />
          </section>
        )}
      </div>
    </main>
  );
};

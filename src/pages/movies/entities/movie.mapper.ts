import type { MovieDetails, MovieSummary } from '@/pages/movies/entities/movie';
import type { TmdbDetails, TmdbMovie } from '@/pages/movies/services/tmdb.types';

export const mapMovie = (movie: TmdbMovie): MovieSummary => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  releaseDate: movie.release_date,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  voteAverage: movie.vote_average,
  voteCount: movie.vote_count,
  popularity: movie.popularity,
  genreIds: movie.genre_ids ?? [],
  originalLanguage: movie.original_language,
});

export const mapMovieDetails = (movie: TmdbDetails): MovieDetails => {
  const providers =
    movie['watch/providers']?.results?.ID?.flatrate ??
    movie['watch/providers']?.results?.US?.flatrate ??
    [];
  return {
    ...mapMovie(movie),
    runtime: movie.runtime ?? null,
    status: movie.status,
    tagline: movie.tagline ?? '',
    genres: movie.genres ?? [],
    cast: (movie.credits?.cast ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      character: item.character,
      profilePath: item.profile_path,
      order: item.order,
    })),
    crew: (movie.credits?.crew ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      job: item.job,
      department: item.department,
      profilePath: item.profile_path,
    })),
    videos: (movie.videos?.results ?? []).map((item) => ({
      id: item.id,
      key: item.key,
      name: item.name,
      site: item.site,
      type: item.type,
      official: item.official,
      publishedAt: item.published_at,
    })),
    recommendations: (movie.recommendations?.results ?? []).map(mapMovie),
    similar: (movie.similar?.results ?? []).map(mapMovie),
    providers: providers.map((item) => ({
      providerId: item.provider_id,
      providerName: item.provider_name,
      logoPath: item.logo_path,
      displayPriority: item.display_priority,
    })),
  };
};

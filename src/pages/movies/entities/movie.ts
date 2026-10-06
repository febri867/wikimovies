export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genreIds: number[];
  originalLanguage: string;
}

export interface Genre {
  id: number;
  name: string;
}
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
}
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string | null;
}
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  publishedAt: string;
}
export interface Provider {
  providerId: number;
  providerName: string;
  logoPath: string | null;
  displayPriority: number;
}

export interface MovieDetails extends MovieSummary {
  runtime: number | null;
  status: string;
  tagline: string;
  genres: Genre[];
  cast: CastMember[];
  crew: CrewMember[];
  videos: Video[];
  recommendations: MovieSummary[];
  similar: MovieSummary[];
  providers: Provider[];
}

export interface PaginatedMovies {
  movies: MovieSummary[];
  page: number;
  totalPages: number;
  totalResults: number;
}
export interface AutocompleteResult {
  movies: MovieSummary[];
  query: string;
}

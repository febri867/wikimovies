export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  original_language: string;
  runtime?: number | null;
  status?: string;
  tagline?: string;
  genres?: { id: number; name: string }[];
}
export interface TmdbCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}
export interface TmdbCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}
export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}
export interface TmdbProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
  display_priority: number;
}
export interface TmdbPage {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}
export interface TmdbDetails extends TmdbMovie {
  runtime: number | null;
  status: string;
  tagline: string;
  genres: { id: number; name: string }[];
  credits?: { cast: TmdbCast[]; crew: TmdbCrew[] };
  videos?: { results: TmdbVideo[] };
  recommendations?: TmdbPage;
  similar?: TmdbPage;
  'watch/providers'?: {
    results?: Record<
      string,
      { flatrate?: TmdbProvider[]; rent?: TmdbProvider[]; buy?: TmdbProvider[] }
    >;
  };
}

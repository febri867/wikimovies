import { describe, expect, it } from 'vitest';
import { mapMovie, mapMovieDetails } from './movie.mapper';
const base = {
  id: 1,
  title: 'Demo',
  overview: 'Overview',
  release_date: '2026-01-01',
  poster_path: '/p.jpg',
  backdrop_path: '/b.jpg',
  vote_average: 8,
  vote_count: 10,
  popularity: 20,
  genre_ids: [1],
  original_language: 'en',
};
describe('movie mapper', () => {
  it('maps summary', () =>
    expect(mapMovie(base)).toMatchObject({
      id: 1,
      title: 'Demo',
      posterPath: '/p.jpg',
      genreIds: [1],
    }));
  it('maps details and nested data', () => {
    const result = mapMovieDetails({
      ...base,
      runtime: 120,
      status: 'Released',
      tagline: 'Hi',
      genres: [{ id: 1, name: 'Drama' }],
      credits: {
        cast: [{ id: 2, name: 'Actor', character: 'Hero', profile_path: null, order: 0 }],
        crew: [
          { id: 3, name: 'Director', job: 'Director', department: 'Directing', profile_path: null },
        ],
      },
      videos: {
        results: [
          {
            id: 'v',
            key: 'k',
            name: 'Trailer',
            site: 'YouTube',
            type: 'Trailer',
            official: true,
            published_at: '2026-01-01',
          },
        ],
      },
      recommendations: { page: 1, results: [base], total_pages: 1, total_results: 1 },
      similar: { page: 1, results: [base], total_pages: 1, total_results: 1 },
      'watch/providers': {
        results: {
          ID: {
            flatrate: [
              { provider_id: 1, provider_name: 'Stream', logo_path: null, display_priority: 1 },
            ],
          },
        },
      },
    });
    expect(result.cast[0].name).toBe('Actor');
    expect(result.crew[0].job).toBe('Director');
    expect(result.videos[0].key).toBe('k');
    expect(result.recommendations).toHaveLength(1);
    expect(result.providers[0].providerName).toBe('Stream');
  });
});

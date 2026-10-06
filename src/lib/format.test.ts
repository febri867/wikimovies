import { describe, expect, it } from 'vitest';
import { imageUrl, rating, runtime, year } from './format';
describe('format', () => {
  it('formats image url', () => expect(imageUrl('/abc.jpg', 'w342')).toContain('/w342/abc.jpg'));
  it('formats year', () => expect(year('2026-02-03')).toBe('2026'));
  it('formats rating', () => expect(rating(8.456)).toBe('8.5'));
  it('formats empty rating', () => expect(rating(0)).toBe('N/A'));
  it('formats runtime', () => expect(runtime(125)).toBe('2h 5m'));
  it('formats empty runtime', () => expect(runtime(null)).toBe('—'));
});

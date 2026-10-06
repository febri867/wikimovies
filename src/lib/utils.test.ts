import { describe, expect, it, vi } from 'vitest';
import { cn, debounce, throttle } from './utils';
describe('utils', () => {
  it('joins truthy classes', () => expect(cn('a', false, undefined, 'b')).toBe('a b'));
  it('debounces', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const call = debounce(fn, 100);
    call();
    call();
    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
  it('throttles', () => {
    vi.spyOn(Date, 'now')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(150)
      .mockReturnValueOnce(220);
    const fn = vi.fn();
    const call = throttle(fn, 100);
    call();
    call();
    call();
    expect(fn).toHaveBeenCalledTimes(2);
    vi.restoreAllMocks();
  });
});

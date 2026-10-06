import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';
import { useInfiniteScroll } from './useInfiniteScroll';
describe('movie hooks', () => {
  it('debounces a value', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDebouncedValue('a', 100));
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe('a');
    vi.useRealTimers();
  });
  it('creates an infinite scroll ref', () => {
    const { result } = renderHook(() => useInfiniteScroll(false, () => {}));
    expect(result.current.current).toBeNull();
  });
});

import { useEffect, useRef } from 'react';
export const useInfiniteScroll = (enabled: boolean, onIntersect: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onIntersect();
      },
      { rootMargin: '700px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, onIntersect]);
  return ref;
};

import { Skeleton } from '@/shared/components/atoms/Skeleton';
export const MovieSkeletonGrid = () => (
  <div className="movie-grid">
    {Array.from({ length: 12 }, (_, i) => (
      <div className="movie-card" key={i}>
        <Skeleton className="poster" />
        <Skeleton className="line" />
        <Skeleton className="line short" />
      </div>
    ))}
  </div>
);

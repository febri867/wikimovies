import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { imageUrl } from '@/lib/format';
import { cn } from '@/lib/utils';
export const Poster = ({
  path,
  title,
  className,
}: {
  path: string | null;
  title: string;
  className?: string;
}) => {
  const [failed, setFailed] = useState(false);
  return path && !failed ? (
    <img
      className={cn('poster', className)}
      src={imageUrl(path)}
      alt={`${title} poster`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  ) : (
    <div
      className={cn('poster poster-empty', className)}
      aria-label={`${title} poster unavailable`}
    >
      <ImageOff size={24} />
    </div>
  );
};

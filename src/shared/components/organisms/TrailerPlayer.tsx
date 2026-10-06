import { useState } from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Video } from '@/pages/movies/entities/movie';

const preferred = (videos: Video[]) =>
  videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official) ??
  videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer') ??
  videos.find((video) => video.site === 'YouTube');

export const TrailerPlayer = ({ videos }: { videos: Video[] }) => {
  const { t } = useTranslation();
  const video = preferred(videos);
  const [playing, setPlaying] = useState(false);
  if (!video) return null;
  return (
    <section className="trailer">
      <div className="section-heading">
        <div>
          <p className="eyebrow">WATCH</p>
          <h2>Official trailer</h2>
        </div>
      </div>
      {playing ? (
        <div className="video-frame">
          <iframe
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&rel=0`}
            title={video.name}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          className="video-poster"
          onClick={() => setPlaying(true)}
          aria-label={t('playTrailer', { name: video.name })}
        >
          <img src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="play-button">
            <Play size={26} fill="currentColor" />
          </span>
          <span className="video-title">{video.name}</span>
        </button>
      )}
    </section>
  );
};

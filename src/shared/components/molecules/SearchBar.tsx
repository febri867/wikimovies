import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { MovieSummary } from '@/pages/movies/entities/movie';
import { Poster } from '@/shared/components/atoms/Poster';
import { year } from '@/lib/format';

interface SearchBarProps {
  value: string;
  suggestions: MovieSummary[];
  isLoading: boolean;
  onChange: (value: string) => void;
  onSelect: (movie: MovieSummary) => void;
  onClear: () => void;
}

export const SearchBar = ({
  value,
  suggestions,
  isLoading,
  onChange,
  onSelect,
  onClear,
}: SearchBarProps) => {
  const { t } = useTranslation();
  return (
    <div className="search-wrap">
      <label className="search">
        <Search size={18} aria-hidden="true" />
        <input
          aria-label={t('search')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          autoComplete="off"
        />
        <button type="button" aria-label={t('clearSearch')} onClick={onClear} disabled={!value}>
          <X size={16} />
        </button>
      </label>
      {value.trim().length >= 2 && (
        <div className="suggestions" role="listbox" aria-label={t('suggestions')}>
          {isLoading ? (
            <div className="suggestion-loading">{t('searching')}</div>
          ) : suggestions.length ? (
            suggestions.slice(0, 6).map((movie) => (
              <button
                key={movie.id}
                role="option"
                className="suggestion"
                onMouseDown={() => onSelect(movie)}
              >
                <Poster path={movie.posterPath} title={movie.title} />
                <span>
                  <strong>{movie.title}</strong>
                  <small>{year(movie.releaseDate)}</small>
                </span>
              </button>
            ))
          ) : (
            <div className="suggestion-loading">{t('noMatchingMovies')}</div>
          )}
        </div>
      )}
    </div>
  );
};

import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { MovieCategory, MovieSummary } from '@/pages/movies/entities/movie';
import { SearchBar } from '@/shared/components/molecules/SearchBar';
import { CategoryTabs } from '@/shared/components/molecules/CategoryTabs';
import { LanguageSwitcher } from '@/shared/components/molecules/LanguageSwitcher';
import { Button } from '@/shared/components/atoms/Button';
import { WikiLogo } from '@/shared/components/atoms/WikiLogo';

interface HeaderProps {
  category: MovieCategory;
  query: string;
  suggestions: MovieSummary[];
  isSearching: boolean;
  theme: 'dark' | 'light';
  onCategory: (value: MovieCategory) => void;
  onQuery: (value: string) => void;
  onSelect: (movie: MovieSummary) => void;
  onClear: () => void;
  onToggleTheme: () => void;
}

export const Header = ({
  category,
  query,
  suggestions,
  isSearching,
  theme,
  onCategory,
  onQuery,
  onSelect,
  onClear,
  onToggleTheme,
}: HeaderProps) => {
  const { t } = useTranslation();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="header">
      <Link to="/" className="brand" aria-label={t('home')}>
        <WikiLogo compact />
        <span>WikiMovies</span>
      </Link>
      <SearchBar
        value={query}
        suggestions={suggestions}
        isLoading={isSearching}
        onChange={onQuery}
        onSelect={onSelect}
        onClear={onClear}
      />
      <div className="header-actions">
        <CategoryTabs active={category} onChange={onCategory} />
        <LanguageSwitcher />
        <Button
          className="theme-toggle"
          aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
          onClick={onToggleTheme}
        >
          <span className="theme-icon" key={theme}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </span>
          <span className="sr-only">{nextTheme}</span>
        </Button>
      </div>
    </header>
  );
};

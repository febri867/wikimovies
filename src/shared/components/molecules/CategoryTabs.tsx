import { useTranslation } from 'react-i18next';
import type { MovieCategory } from '@/pages/movies/entities/movie';

const categories: MovieCategory[] = ['now_playing', 'popular', 'top_rated', 'upcoming'];

export const CategoryTabs = ({
  active,
  onChange,
}: {
  active: MovieCategory;
  onChange: (value: MovieCategory) => void;
}) => {
  const { t } = useTranslation();
  return (
    <nav className="tabs" aria-label={t('categories')}>
      {categories.map((item) => (
        <button
          key={item}
          className={active === item ? 'active' : ''}
          aria-current={active === item ? 'page' : undefined}
          onClick={() => onChange(item)}
        >
          {t(item)}
        </button>
      ))}
    </nav>
  );
};

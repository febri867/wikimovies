import { AlertCircle, Film, SearchX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/atoms/Button';
import { Spinner } from '@/shared/components/atoms/Spinner';

export const LoadingState = () => {
  const { t } = useTranslation();
  return (
    <section className="state" aria-live="polite">
      <Spinner label={t('loadingMovies')} />
      <h2>{t('findingSomething')}</h2>
      <p>{t('fetchingCatalog')}</p>
    </section>
  );
};
export const EmptyState = ({ query }: { query?: string }) => {
  const { t } = useTranslation();
  return (
    <section className="state">
      <SearchX size={40} />
      <h2>{t('noMoviesFound')}</h2>
      <p>{query ? t('nothingMatched', { query }) : t('emptyCollection')}</p>
    </section>
  );
};
export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useTranslation();
  return (
    <section className="state">
      <AlertCircle size={40} />
      <h2>{t('snag')}</h2>
      <p>{t('tmdbUnavailable')}</p>
      <Button onClick={onRetry}>{t('retry')}</Button>
    </section>
  );
};
export const NotFoundState = () => {
  const { t } = useTranslation();
  return (
    <section className="state">
      <Film size={40} />
      <h2>{t('movieNotFound')}</h2>
      <p>{t('invalidLink')}</p>
    </section>
  );
};

import { Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/shared/i18n';

export const LanguageSwitcher = () => {
  const { t, i18n: currentI18n } = useTranslation();
  return (
    <label className="language-switcher" title={t('language')}>
      <Globe2 size={15} aria-hidden="true" />
      <span className="sr-only">{t('language')}</span>
      <select
        value={currentI18n.language}
        onChange={(event) => void i18n.changeLanguage(event.target.value)}
        aria-label={t('language')}
      >
        <option value="en">EN</option>
        <option value="id">ID</option>
      </select>
    </label>
  );
};

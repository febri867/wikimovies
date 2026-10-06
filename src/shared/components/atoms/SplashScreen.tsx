import { useTranslation } from 'react-i18next';
import { WikiLogo } from './WikiLogo';

export const SplashScreen = ({ visible }: { visible: boolean }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`splash ${visible ? 'splash-visible' : 'splash-hidden'}`}
      aria-hidden={!visible}
    >
      <div className="splash-orbit" />
      <div className="splash-card">
        <div className="splash-logo">
          <WikiLogo compact />
        </div>
        <strong>WikiMovies</strong>
        <span>{t('splashTagline')}</span>
        <div className="splash-progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
};

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WikiLogo } from './atoms/WikiLogo';
import { SplashScreen } from './atoms/SplashScreen';
import { LanguageSwitcher } from './molecules/LanguageSwitcher';

describe('new presentation features', () => {
  it('renders the WikiMovies logo', () => {
    render(<WikiLogo />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders and hides the splash screen', () => {
    const { rerender } = render(<SplashScreen visible />);
    expect(screen.getByText('WikiMovies')).toBeInTheDocument();
    rerender(<SplashScreen visible={false} />);
    expect(screen.getByText('WikiMovies')).toBeInTheDocument();
  });

  it('supports changing language while keeping English as default', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    const select = screen.getByRole('combobox', { name: 'Language' });
    expect(select).toHaveValue('en');
    await user.selectOptions(select, 'id');
    expect(select).toHaveValue('id');
    await user.selectOptions(select, 'en');
  });
});

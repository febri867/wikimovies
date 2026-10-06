import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorState, EmptyState, LoadingState, NotFoundState } from './States';
import { TrailerPlayer } from './TrailerPlayer';
describe('organisms', () => {
  it('renders states', () => {
    render(
      <>
        <LoadingState />
        <EmptyState query="x" />
        <NotFoundState />
      </>,
    );
    expect(screen.getByText(/finding something/i)).toBeInTheDocument();
    expect(screen.getByText(/nothing matched/i)).toBeInTheDocument();
    expect(screen.getByText(/movie not found/i)).toBeInTheDocument();
  });
  it('retries from error state', async () => {
    const user = userEvent.setup(),
      fn = vi.fn();
    render(<ErrorState onRetry={fn} />);
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(fn).toHaveBeenCalled();
  });
  it('plays trailer after click', async () => {
    const user = userEvent.setup();
    render(
      <TrailerPlayer
        videos={[
          {
            id: '1',
            key: 'abc',
            name: 'Official Trailer',
            site: 'YouTube',
            type: 'Trailer',
            official: true,
            publishedAt: '',
          },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: /play official trailer/i }));
    expect(screen.getByTitle('Official Trailer')).toBeInTheDocument();
  });
  it('does not render absent trailer', () => {
    const { container } = render(<TrailerPlayer videos={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

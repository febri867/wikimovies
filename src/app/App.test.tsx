import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';
describe('App', () => {
  it('renders the browse experience', () => {
    render(<App />);
    expect(screen.getByLabelText(/search movies/i)).toBeInTheDocument();
  });
});

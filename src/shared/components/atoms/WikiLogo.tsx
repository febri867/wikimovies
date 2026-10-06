export const WikiLogo = ({ compact = false }: { compact?: boolean }) => (
  <span className="wiki-logo" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img" aria-label="WikiMovies logo">
      <defs>
        <linearGradient id="wiki-logo-gradient" x1="4" y1="4" x2="44" y2="44">
          <stop offset="0" />
          <stop offset="1" stopColor="#ff5a63" />
        </linearGradient>
      </defs>
      <path
        d="M7 11.5C12 8 18 8 24 12v25c-6-4-12-4-17-1.5v-24Z"
        fill="url(#wiki-logo-gradient)"
        opacity=".96"
      />
      <path
        d="M41 11.5C36 8 30 8 24 12v25c6-4 12-4 17-1.5v-24Z"
        fill="url(#wiki-logo-gradient)"
        opacity=".7"
      />
      <path d="m19 18 13 6-13 6V18Z" fill="#fff" />
    </svg>
    {!compact && <span className="sr-only">WikiMovies</span>}
  </span>
);

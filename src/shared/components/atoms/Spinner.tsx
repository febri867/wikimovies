export const Spinner = ({ label = 'Loading' }: { label?: string }) => (
  <span className="spinner" role="status" aria-label={label} />
);

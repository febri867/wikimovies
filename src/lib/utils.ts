export const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(' ');
export const debounce = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
export const throttle = <T extends (...args: never[]) => void>(fn: T, limit: number) => {
  let last = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      fn(...args);
    }
  };
};

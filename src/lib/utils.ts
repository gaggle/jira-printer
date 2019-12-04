export function filter<T, K extends keyof T>(object: T, ...keys: K[]): Omit<T, K> {
  let index = -1;
  const length = keys.length;
  const result = { ...object };

  while (++index < length) {
    const key = keys[index];
    if (key in object) {
      delete result[key];
    }
  }
  return result;
}

export function getNowInEpochSeconds(): number {
  return Math.floor(new Date().getTime() / 1000);
}

export function isClient(): boolean {
  return typeof window === 'object';
}

export function parseQueryString(query: string): { [key: string]: string } {
  if (!query) {
    return {};
  }
  const trimmedQuery = /^[?#]/.test(query) ? query.slice(1) : query;
  return trimmedQuery
    .split('&')
    .reduce(
      (params, param) => {
        const [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      },
      {},
    );
}

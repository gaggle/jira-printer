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

export function parseViaQuery(viaQuery: string): [string | undefined, string | undefined] {
  if (!viaQuery) {
    return [undefined, undefined];
  }
  const trimmedQuery = /^[?#]/.test(viaQuery) ? viaQuery.slice(1) : viaQuery; // Ensure no initial question-mark
  const [path, rest] = trimmedQuery.split('?', 2);
  return [path, rest];
}

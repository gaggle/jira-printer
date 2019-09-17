export async function PostJson(url: string, payload: {}, headers: {} = {}): Promise<Response> {
  await sleep(400);
  return fetch(url, {
    body: JSON.stringify(payload),
    headers: {
      ...headers,
      ...{
        'Content-type': 'application/json',
      },
    },
    method: 'POST',
  });
}

export function appendURLSearchParams(obj: {}, params: URLSearchParams) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !!obj[key]) {
      params.append(key, obj[key]);
    }
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

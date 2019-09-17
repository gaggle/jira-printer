import { useEffect, useState } from 'react';

import { EpochSeconds } from '../types/time';

export type Fetch<Ok> =
  | { mode: 'error', status: number, data: any }
  | { mode: 'loading', begun: EpochSeconds }
  | { mode: 'ok', status: number, data: Ok }
  ;

export function useJsonFetch<Ok>(url: string) {
  const [data, setData] = useState<Fetch<Ok>>({ mode: 'loading', begun: new Date().getTime() });

  async function fetchData() {
    const response = await fetch(url);
    if (response.ok) {
      const responseData: Ok = await response.json();
      setData(
        {
          data: responseData,
          mode: 'ok',
          status: response.status,
        });
    } else {
      const responseData = await response.text();
      setData(
        {
          data: responseData,
          mode: 'error',
          status: response.status,
        });
    }
  }

  useEffect(
    () => {
      // noinspection JSIgnoredPromiseFromCall
      fetchData();
    },
    [url]);

  return data;
}

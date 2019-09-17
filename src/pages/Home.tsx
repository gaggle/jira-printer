import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SearchField } from '../components/SearchField/index';
import { Routing } from '../lib/routing';

import { PageProps } from '../types/pages';

export function Home(props: PageProps) {
  const [searched, setSearched] = useState<string[]>([]);

  function onSearch(value: string) {
    const values = value.split(' ').map((e) => e.trim()).filter((e) => !!e);
    setSearched(values);
  }

  if (searched.length) {
    return <Redirect to={`${Routing.issues.path}?q=${searched.join(',')}`}/>;
  }

  return <>
    <div>Oh hi there...</div>
    <SearchField onSearch={onSearch}/>
  </>;
}

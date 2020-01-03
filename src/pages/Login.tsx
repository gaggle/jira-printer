import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { FormState, LoginForm } from '../components/LoginForm';
import { useStoreDispatch } from '../hooks/use-store';
import { PostJson } from '../lib/fetching';
import { getMetaData } from '../lib/meta';
import { Routing } from '../lib/routing';
import { isClient, parseViaQuery } from '../lib/utils';
import { PageProps } from '../types/pages';

export function Login(props: PageProps) {
  const [authed, setAuthed] = useState(false);
  const search = new URLSearchParams(props.location.search);
  const [error, setError] = useState<string | null>(search.get('error'));
  const dispatch = useStoreDispatch();

  const lockedFormData: FormState = {};
  if (isClient()) {
    const meta = getMetaData('loginform');
    if (meta) {
      lockedFormData.token = meta.jiraToken;
      lockedFormData.url = meta.jiraUrl;
      lockedFormData.user = meta.jiraUser;
    }
  }

  const viaParam = search.get('via');
  const [path, query] = parseViaQuery(viaParam);
  const viaRouting = path ? Routing.fromLabel(path) : undefined;
  const to = viaRouting ? `${viaRouting.path}?${query}` : Routing.issues.path;
  return authed
    ? <Redirect to={to}/>
    : <>
      <LoginForm
        action={
          (viaRouting && viaRouting !== Routing.issues)
            ? `go to ${viaRouting.name}`
            : query
            ? 'search'
            : undefined
        }
        errors={error ? [error] : undefined}
        onSubmit={async (formState: FormState) => {
          setError(null);
          const response = await PostJson('/api/login', formState);
          if (response.status === 200) {
            dispatch({ type: 'connected' });
            setAuthed(true);
          } else {
            console.debug(`Form submit failed (${response.status})`);
            dispatch({ type: 'disconnected' });
            const content = await response.text();
            setError(content);
          }
        }}
        lockedState={lockedFormData}
      />
    </>;
}

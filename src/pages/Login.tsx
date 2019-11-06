import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { FormState, LoginForm } from '../components/LoginForm';
import { useStoreDispatch } from '../hooks/use-store';
import { PostJson } from '../lib/fetching';
import { getMetaData } from '../lib/meta';
import { Routing } from '../lib/routing';
import { isClient, parseQueryString } from '../lib/utils';
import { PageProps } from '../types/pages';

export function Login(props: PageProps) {
  const [authed, setAuthed] = useState(false);
  const [errors, setErrors] = useState<string[] | undefined>(undefined);
  const dispatch = useStoreDispatch();
  const search = parseQueryString(props.location.search);
  const viaRouting = Routing.fromLabel(search.via);

  const lockedFormData: FormState = {};
  if (isClient()) {
    const meta = getMetaData('loginform');
    if (meta) {
      lockedFormData.token = meta.jiraToken;
      lockedFormData.url = meta.jiraUrl;
      lockedFormData.user = meta.jiraUser;
    }
  }

  let to = viaRouting ? viaRouting.path : Routing.home.path;
  if (search) {
    to += `?q=${search.q}`;
  }
  return authed
    ? <Redirect to={to}/>
    : <>
      <LoginForm
        action={(viaRouting && viaRouting !== Routing.home) ? viaRouting.name : undefined}
        errors={errors}
        onSubmit={async (formState: FormState) => {
          setErrors(undefined);
          const response = await PostJson('/api/login', formState);
          if (response.status === 200) {
            dispatch({ type: 'connected' });
            setAuthed(true);
          } else {
            console.debug(`Form submit failed (${response.status})`);
            dispatch({ type: 'disconnected' });
            const content = await response.json();
            setErrors(content.errors);
          }
        }}
        lockedState={lockedFormData}
      />
    </>;
}

import React, { ElementType } from 'react';
import { Redirect } from 'react-router-dom';

import { useJsonFetch } from '../hooks/use-json-fetch';
import { useStoreDispatch } from '../hooks/use-store';
import { Routing } from '../lib/routing';
import { isClient } from '../lib/utils';
import * as Verify from '../types/api-verify';
import { PageProps } from '../types/pages';

export function RequiresAuth(WrappedComponent: ElementType) {
  return (props: PageProps) => {
    const dispatch = useStoreDispatch();
    const fetched = useJsonFetch<Verify.ResponseOk>('/api/verify');

    if (!isClient() || fetched.mode === 'loading') {
      return <div>Loading...</div>;
    }

    if (fetched.mode === 'ok') {
      dispatch({ type: 'connected' });
      return <WrappedComponent {...props}/>;
    } else {
      let msg = 'Token verify failed';
      if (fetched.data) {
        msg += `, reason: ${fetched.data}`;
      }
      dispatch({ type: 'disconnected' });
      const routing = Routing.fromPath(props.location.pathname);
      const params = new URLSearchParams();
      params.append('via', `${routing.label}${props.location.search}`);
      params.append('error', msg);
      return <Redirect to={`${Routing.login.path}?${params}`}/>;
    }
  };
}

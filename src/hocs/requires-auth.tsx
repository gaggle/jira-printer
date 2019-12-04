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
      console.debug(msg);
      dispatch({ type: 'disconnected' });
      const routing = Routing.fromPath(props.location.pathname);
      const search = props.location.search.slice(1, props.location.search.length);
      const query = new URLSearchParams();
      query.append('via', `${routing.label}&${search}`);
      query.append('error', msg);

      return <Redirect to={`${Routing.login.path}?${query}`}/>;
    }
  };
}

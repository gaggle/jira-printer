import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Paged } from './hocs/paged';
import { RequiresAuth } from './hocs/requires-auth';
import { StoreProvider } from './hooks/use-store';
import { Routing } from './lib/routing';
import { Issues } from './pages/Issues';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import './styles.css';
import { PageProps } from './types/pages';

export default function App() {
  return <main>
    <StoreProvider>
      <Switch>
        <Route exact={true} path={Routing.root.path} component={Landing}/>
        <Route exact={true} path={Routing.issues.path} component={RequiresAuth(Paged(Issues))}/>
        <Route exact={true} path={Routing.login.path} component={Login}/>
        <Route component={NotFound404}/>
      </Switch>
    </StoreProvider>
  </main>;
}

function NotFound404(props: PageProps) {
  if (props.staticContext) {
    props.staticContext.statusCode = 404;
  }
  return (
    <div>
      <h3>
        No match for <code>{props.location.pathname}</code>
      </h3>
    </div>
  );
}

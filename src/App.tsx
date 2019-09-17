import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import { Paged } from './hocs/paged';
import { RequiresAuth } from './hocs/requires-auth';
import { StoreProvider } from './hooks/use-store';
import { Routing } from './lib/routing';
import { Home } from './pages/Home';
import { Issue } from './pages/Issue';
import { Login } from './pages/Login';
import { PageProps } from './types/pages';

export default function App() {
  return <main>
    <StoreProvider>
      <Switch>
        <Route exact={true} path={Routing.home.path} component={RequiresAuth(Paged(Home))}/>
        <Route exact={true} path={Routing.issues.path} component={RequiresAuth(Paged(Issue))}/>
        <Route exact={true} path={Routing.login.path} component={Paged(Login)}/>
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

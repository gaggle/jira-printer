import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Issue } from './Issue';

import './App.css';

function App() {
  return <Switch>
    <Route exact={true} path="/" component={Issue}/>
  </Switch>;
}

export default App;

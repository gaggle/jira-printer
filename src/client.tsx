import React from 'react';
import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

// TODO: Back to hydrate for proper SSR
render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}

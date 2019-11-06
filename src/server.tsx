import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './App';
import { TokenFactory } from './lib/jwt-token';
import { apiRouter } from './server-api-router';

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

export interface Conf {
  lockedCredentials: { token?: string; url?: string; user?: string };
  token: { duration: number; secret: string };
  useMock: boolean;
}

const conf: Conf = {
  lockedCredentials: {
    token: process.env.JIRA_TOKEN,
    url: process.env.JIRA_URL,
    user: process.env.JIRA_USER,
  },
  token: {
    duration: parseInt(process.env.TOKEN_DURATION || '1800', 10), // Expiration in seconds
    secret: process.env.TOKEN_SECRET!,
  },
  useMock: !!process.env.JIRA_USE_MOCK,
};

if (!conf.token.secret) {
  throw new Error(`TOKEN_SECRET must be specified, got: ${conf.token.secret}`);
}

const tokenFactory = new TokenFactory(conf.token.secret, conf.token.duration);

const server = express()
  .use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  })
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))

  .use(express.json()) // to support JSON-encoded bodies
  .use(express.urlencoded({ extended: true })) // to support URL-encoded bodies

  .use('/api', apiRouter(tokenFactory, conf))

  .get('/*', htmlEndpoint);

export default server;

function htmlEndpoint(req: express.Request, res: express.Response) {
  const context = {};
  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App/>
    </StaticRouter>,
  );
  res.send(
    `<!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <meta
       name="loginform"
       ${conf.lockedCredentials.token ? `data-jira-token=${conf.lockedCredentials.token}` : ''}
       ${conf.lockedCredentials.url ? `data-jira-url=${conf.lockedCredentials.url}` : ''}
       ${conf.lockedCredentials.user ? `data-jira-user=${conf.lockedCredentials.user}` : ''}
      >
      <title>Jira Printer</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
      assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
    }
      ${
      process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`
    }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
    </html>`,
  );
}

import { Request, Response, Router } from 'express';

import * as jira from './lib/jira';
import { TokenFactory } from './lib/jwt-token';
import { filter } from './lib/utils';
import { Conf } from './server';
import * as GetIssues from './types/api-get-issues';
import * as Login from './types/api-login';
import * as Verify from './types/api-verify';

export function apiRouter(tokenFactory: TokenFactory, conf: Conf): Router {
  function addCookieHeader(res: Response, signedToken: string): void {
    res.header('Set-Cookie', getCookie(signedToken));
  }

  function getCookie(signedToken: string): string {
    return `${signedToken}; Max-Age=${conf.token.duration}; Path=/`;
  }

  const router = Router();

  router.post('/login', (req: Request & Login.Request, res: Response) => {
    const errors: string[] = [];

    const token = conf.lockedCredentials.token || req.body.token;
    if (!token) {
      errors.push('Missing token');
    }

    const url = conf.lockedCredentials.url || req.body.url;
    if (!url) {
      errors.push('Missing url');
    }

    const user = conf.lockedCredentials.user || req.body.user;
    if (!user) {
      errors.push('Missing user');
    }
    if (errors.length) {
      const errorBody: Login.ResponseError = { errors };
      res.status(400).send(errorBody);
      return;
    }

    addCookieHeader(res, tokenFactory.signToken(tokenFactory.newToken({ token, url, user })));
    const body: Login.ResponseOk = 'ok';
    res.send(body);
  });

  router.get('/verify', (req: Request & Verify.Request, res: Response) => {
    const cookie = req.headers.cookie;

    function deny(reason: string): void {
      const body: Verify.ResponseError = { error: reason };
      res.status(400).send(body);
    }

    if (!cookie) {
      return deny('No cookie');
    }
    try {
      const decodedToken = tokenFactory.decodeToken(cookie);
      addCookieHeader(res, tokenFactory.signToken(tokenFactory.castToToken(decodedToken)));
      const body: Verify.ResponseOk = filter(decodedToken, 'data');
      res.send(body);
    } catch (err) {
      return deny(err.message);
    }
  });

  router.get('/get-issues', async (req: Request & GetIssues.Request, res: Response) => {
    const cookie = req.headers.cookie;

    function deny(reason: string): void {
      const resp: Verify.ResponseError = { error: reason };
      res.status(400).send(resp);
    }

    if (!cookie) {
      return deny('No cookie');
    }

    const decodedToken = tokenFactory.decodeToken(cookie);
    jira.init(decodedToken.data.url, decodedToken.data.user, decodedToken.data.token, conf.useMock);
    const query = req.query.q.split(',');
    let results: GetIssues.Issue[];
    try {
      results = await jira.get(query);
    } catch (err) {
      console.error(`Error /get-issues using '${query}':`, err.message);
      return res.status(500).send(err);
    }

    results.map((iss) => {
      if (iss.issue.description) {
        iss.issue.description = confluenceMarkdownToMarkdown(iss.issue.description);
      }
    });

    const body: GetIssues.ResponseOk = {
      items: results,
      total: results.length,
    };
    return res.json(body);
  });

  router.use('/', (req: Request, res: Response) => {
    res.sendStatus(404);
  });

  return router;
}

function confluenceMarkdownToMarkdown(s: string): string {
  return s.replace(/h2\./, '##');
}

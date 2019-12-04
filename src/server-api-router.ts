import { Request, Response, Router } from 'express';

import * as httpErrors from 'http-errors';
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

  router.post('/login', async (req: Request & Login.Request, res: Response, next) => {
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
      return next(new httpErrors.BadRequest(errors.join(', ')));
    }

    jira.init(url, user, token, conf.useMock);

    if (!await jira.ping()) {
      return next(new httpErrors.Unauthorized('Could not ping server'));
    }

    addCookieHeader(res, tokenFactory.signToken(tokenFactory.newToken({ token, url, user })));
    const body: Login.ResponseOk = 'ok';
    return res.send(body);
  });

  router.get('/verify', (req: Request & Verify.Request, res: Response, next) => {
    const cookie = req.headers.cookie;

    function deny(reason: string): void {
      return next(new httpErrors.BadRequest(reason));
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

  router.get('/get-issues', async (req: Request & GetIssues.Request, res: Response, next) => {
    const cookie = req.headers.cookie;

    function deny(reason: string): void {
      return next(new httpErrors.BadRequest(reason));
    }

    if (!cookie) {
      return deny('No cookie');
    }

    const decodedToken = tokenFactory.decodeToken(cookie);
    jira.init(decodedToken.data.url, decodedToken.data.user, decodedToken.data.token, conf.useMock);
    const query = req.query.q.split(',');
    let results: GetIssues.Issue[];
    try {
      results = await jira.getIssues(query);
    } catch (err) {
      return next(new httpErrors.InternalServerError(
        `Error /get-issues with query '${query}': ${err.message ? err.message.slice(0, 256) : err}`,
      ));
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

  router.use('/', (_req: Request, _res: Response, next) => {
    return next(new httpErrors.NotFound());
  });

  router.use((err: Error, req: Request, res: Response, next: () => void) => {
    if (err instanceof httpErrors.HttpError) {
      console.error(`[${err.statusCode} ${err.name}]: ${err.message}`);
      return res.status(err.statusCode).send(err.message);
    }
    return next();
  });

  return router;
}

function confluenceMarkdownToMarkdown(s: string): string {
  return s.replace(/h2\./, '##');
}

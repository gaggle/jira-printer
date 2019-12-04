export interface Request {
  body: {
    url?: string;
    user?: string;
    token?: string;
  };
}

export type ResponseOk = 'ok';

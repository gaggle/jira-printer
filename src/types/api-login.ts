export interface Request {
  body: {
    url?: string;
    user?: string;
    token?: string;
  };
}

export type ResponseOk = 'ok';

export interface ResponseError {
  errors: string[];
}

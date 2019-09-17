import { DecodedToken } from './token';

export interface Request {
  headers: {
    cookie?: string;
  };
}

export type ResponseOk = Omit<DecodedToken, 'data'>;
// ⬑ We must never expose the actual data contents of the token back to the client,
// they only ever know the encrypted result. But the various metadata is fine to expose.

export interface ResponseError {
  error: string;
}

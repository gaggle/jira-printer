import { EpochSeconds } from './time';

export interface TokenData {
  token: string;
  url: string;
  user: string;
}

export interface DecodedToken {
  data: TokenData;
  i1st: EpochSeconds; // <- Timestamp for first issued at
  exp: EpochSeconds; // <- Expires at
  iat: EpochSeconds; // <- Issued at
}

export interface Token {
  data: TokenData;
  i1st: EpochSeconds;
  exp?: never;
  iat?: never;
}

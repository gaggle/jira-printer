import jwt from 'jsonwebtoken';
import { DecodedToken, Token, TokenData } from '../types/token';
import { filter, getNowInEpochSeconds } from './utils';

export class TokenFactory {
  private readonly secret: string;
  private readonly duration: number;

  constructor(secret: string, duration: number) {
    this.secret = secret;
    this.duration = duration;
  }

  public castToToken(decodedToken: DecodedToken): Token {
    return filter(decodedToken, 'exp', 'iat');
  }

  public decodeToken(tokenString: string): DecodedToken {
    return jwt.verify(tokenString, this.secret) as DecodedToken;
  }

  public newToken(data: TokenData): Token {
    return { data, i1st: getNowInEpochSeconds() };
  }

  public signToken(token: Token): string {
    return jwt.sign(token, this.secret, { expiresIn: this.duration });
  }
}

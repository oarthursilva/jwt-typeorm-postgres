import { NextFunction, Request, Response } from 'express';

import { AuthorizeResponseType } from '../../../types/response/AuthorizeResponseType';
import { JWT, IJWT } from '../../jwt/JWT';

interface TokenPayload {
  id: string;
  email: string;
}

/**
 * 
 * @param request 
 * @param response 
 * @param next 
 * @returns 
 */
export async function VerifyJWT(request: Request, response: Response, next: NextFunction) {
  const authorizationHeader = request.header('Authorization');
  if (!authorizationHeader) {
    response.sendStatus(403);
    return;
  }

  const token = extractToken(authorizationHeader);

  try {
    const user = await verify(token);
    request.user = user;

    next();

  } catch (error) {
    return response.json().status(403);
  }
};

/**
 * 
 * @param authorizationToken 
 * @returns 
 */
function extractToken(authorizationToken: string) {
  return authorizationToken.replace('Bearer ', '').trim();
}

/**
 * 
 * @param token 
 * @param jwtModule 
 * @returns 
 */
async function verify(token: string, jwtModule: IJWT = JWT()): Promise<AuthorizeResponseType> {
  return new Promise((resolve, error) => {
    jwtModule.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        error();
      } else {
        const user = decodedToken as TokenPayload;
        resolve({ user });
      };
    })
  });
}

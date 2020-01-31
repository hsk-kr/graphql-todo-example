import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * If the token is invalid, throw error otherwise returns decoded.
 * @param {string} token
 */
export const verifyToken = token => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    throw new Error('Failed to authenticate the token');
  }
};

/**
 * Finds the token from request and returns. if there is no Authorization in header, throw error.
 * @param {object} req
 */
export const getTokenFromReq = req => {
  const Authorization = req.get('Authorization');
  if (Authorization) {
    return Authorization.replace(/bearer /i, '');
  }

  throw new Error('Authorization failed');
};

export const getTokenDecodedFromRequest = req => {
  return verifyToken(getTokenFromReq(req));
};

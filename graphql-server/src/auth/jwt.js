import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * If the token is invalid, returns null otherwise returns decoded.
 * @param {string} token
 */
export const getUserFromToken = token => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
};

/**
 * Finds the token from request and returns. if there is no Authorization in header, returns null.
 * @param {object} req
 */
export const getTokenFromReq = req => {
  const Authorization = req.get('Authorization');
  if (Authorization) {
    return Authorization.replace(/bearer /i, '');
  }

  return null;
};

/**
 * verify if decoded is null or doesn't have neccesary fields inside, if it's invalid throw Error.
 * @param {string} decoded
 */
export const verifyDecoded = decoded => {
  if (!decoded || !decoded.id) {
    throw new Error('Authorization Failed');
  }
  return decoded;
};

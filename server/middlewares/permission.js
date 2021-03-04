import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * @description - use for checking if user is admin
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 */
export const adminAuth = (req, res, next) => {
  if (!req.payload) {
    return response.sendError(
      res,
      401,
      'How did you get pass the authentication middleware 😩😢😫',
    );
  }
  const { isAdmin } = req.payload;

  if (!isAdmin) {
    return response.sendError(res, 403, 'only an admin can perform this operation');
  }
  return next();
};

export const staffAuth = (req, res, next) => {
  if (!req.payload) {
    return response.sendError(
      res,
      401,
      'How did you get pass the authentication middleware 😩😢😫',
    );
  }
  const { type } = req.payload;
  if (!(type === 'staff' || type === 'admin')) {
    return response.sendError(
      res,
      403,
      'only a staff can perform this operation'
    );
  }
  return next();
};

export const check2FA = (req, res, next) => {
  if (!req.payload) {
    return response.sendError(
      res,
      401,
      'How did you get pass the authentication middleware 😩😢😫',
    );
  }

  if (req.payload.allowOnly2FA) {
    return response.sendError(res, 401, 'verify account');
  }
  return next();
};
import UserService from '../services/user.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * user controller performs user signup, sign-in, verify 2FA token and create staff logic
 */
class UserController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */
  static createUser(req, res) {
    UserService.createUser(req.body, req.file || { secure_url: 'https://avatars.dicebear.com/v2/bottts/hap.svg' })
      .then((createdUser) => response.sendSuccess(res, 201, createdUser, 'Registration was successful'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }

  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */
  static signUser(req, res) {
    UserService.signUser(req.body)
      .then((resp) => response.sendSuccess(res, 200, resp, resp.user.enable2FA ? 'Verification token has been sent' : 'LogIn was successful'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }

  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */
  static verifyAuthyToken(req, res) {
    UserService.verifyToken(req.body, req.payload)
      .then((resp) => response.sendSuccess(res, 201, resp, 'LogIn was successful'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }
}

export default UserController;
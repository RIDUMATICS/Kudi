import AccountService from '../services/account.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * account controller performs account related function - CRUD
 */
class AccountController {
  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof AccountController
   */
  static createBankAccount(req, res) {
    AccountService.createAccount(req.body, req.payload)
      .then((resp) => response.sendSuccess(res, 201, resp, 'Account Created'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }
}

export default AccountController;
import ResponseGenerator from '../utils/ResponseGenerator';
import TransactionService from '../services/transaction.service';

const response = new ResponseGenerator();

/**
 *  transaction controller performs transaction related function - CRUD
 */
class TransactionController {
  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async debitUserAccount(req, res) {
    TransactionService.debitAccount(req.payload.id, req.params.accountNumber, req.body.amount)
      .then((resp) => response.sendSuccess(res, 201, resp, 'Transaction successful'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async creditUserAccount(req, res) {
    TransactionService.creditAccount(req.payload.id, req.params.accountNumber, req.body.amount)
      .then((resp) => response.sendSuccess(res, 201, resp, 'Transaction successful'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async getTransactions(req, res) {
    TransactionService.getAllTransactions(req.params.accountNumber, req.payload.id)
      .then((resp) => response.sendSuccess(res, 200, resp, 'Transaction fetch successful'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }

  /**
   * @param{object}  request express request object
   * @param{object}  response express request object
   * @returns {json} json
   * @memberof TransactionController
   */
  static async getATransaction(req, res) {
    TransactionService.getTransaction(req.params.transactionId, req.payload.id)
      .then((resp) => response.sendSuccess(res, 200, resp, 'Transaction fetch successful'))
      .catch((err) => response.sendError(res, err.status, err.message));
  }
}

export default TransactionController;
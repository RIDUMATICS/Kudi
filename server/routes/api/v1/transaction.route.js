import {
  Router
} from 'express';
import TransactionContoller from '../../../controllers/transaction.controller';
import BodySchemaValidator from '../../../middlewares/BodySchemaValidator';
import ParamsSchemaValidator from '../../../middlewares/ParamsSchemaValidator';
import authMiddleware from '../../../middlewares/AuthMiddleware';
import {
  check2FA,
  staffAuth
} from '../../../middlewares/permission';

const router = Router();

router
  .post('/transactions/:accountNumber/debit',
    authMiddleware,
    check2FA,
    staffAuth,
    BodySchemaValidator,
    ParamsSchemaValidator,
    TransactionContoller.debitUserAccount);

router
  .post('/transactions/:accountNumber/credit',
    authMiddleware,
    check2FA,
    staffAuth,
    BodySchemaValidator,
    ParamsSchemaValidator,
    TransactionContoller.creditUserAccount);

router
  .get('/accounts/:accountNumber/transactions',
    authMiddleware,
    check2FA,
    ParamsSchemaValidator,
    TransactionContoller.getTransactions);

router
  .get('/transactions/:transactionId',
    authMiddleware,
    check2FA,
    ParamsSchemaValidator,
    TransactionContoller.getATransaction);

export default router;
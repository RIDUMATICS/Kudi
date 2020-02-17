import {
  Router
} from 'express';
import AccountContoller from '../../../controllers/account.controller';
import BodySchemaValidator from '../../../middlewares/BodySchemaValidator';
import QuerySchemaValidator from '../../../middlewares/QuerySchemaValidator';
import ParamsSchemaValidator from '../../../middlewares/ParamsSchemaValidator';
import authMiddleware from '../../../middlewares/AuthMiddleware';
import {
  check2FA,
  staffAuth
} from '../../../middlewares/permission';

const router = Router();

router
  .post('/accounts',
    authMiddleware,
    check2FA,
    BodySchemaValidator,
    AccountContoller.createBankAccount);

router
  .get('/accounts',
    authMiddleware,
    check2FA,
    staffAuth,
    QuerySchemaValidator,
    AccountContoller.fetchAllAccounts);

router
  .get('/accounts/user',
    authMiddleware,
    check2FA,
    AccountContoller.getAUserAccounts);

router
  .get('/accounts/:accountNumber',
    authMiddleware,
    check2FA,
    staffAuth,
    ParamsSchemaValidator,
    AccountContoller.getAccount);

router
  .patch('/accounts/:accountNumber',
    authMiddleware,
    check2FA,
    ParamsSchemaValidator,
    BodySchemaValidator,
    staffAuth,
    AccountContoller.changeStatus);

export default router;
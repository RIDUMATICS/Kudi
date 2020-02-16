import {
  Router
} from 'express';
import AccountContoller from '../../../controllers/account.controller';
import BodySchemaValidator from '../../../middlewares/BodySchemaValidator';
import authMiddleware from '../../../middlewares/AuthMiddleware';
import { check2FA } from '../../../middlewares/permission';

const router = Router();

router
  .post('/accounts',
    authMiddleware,
    check2FA,
    BodySchemaValidator,
    AccountContoller.createBankAccount);

export default router;
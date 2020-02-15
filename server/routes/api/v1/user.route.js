import {
  Router
} from 'express';
import UserController from '../../../controllers/user.controller';
import BodySchemaValidator from '../../../middlewares/BodySchemaValidator';
import parser from '../../../middlewares/multer-cloudinary';
import authMiddleware from '../../../middlewares/AuthMiddleware';
import { check2FA, adminAuth } from './../../../middlewares/permission';


const router = Router();

router
  .post('/auth/signup', BodySchemaValidator, parser.single('profileImage'), UserController.createUser);

router
  .post('/auth/signin', BodySchemaValidator, UserController.signUser);

router
  .post('/auth/2fa', authMiddleware, BodySchemaValidator, UserController.verifyAuthyToken);

router
  .post('/create/staff', authMiddleware, check2FA, adminAuth, BodySchemaValidator, UserController.createStaff);

export default router;
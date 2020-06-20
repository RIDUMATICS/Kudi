import {
  Router
} from 'express';
import multer from 'multer';
import UserController from '../../../controllers/user.controller';
import BodySchemaValidator from '../../../middlewares/BodySchemaValidator';
import authMiddleware from '../../../middlewares/AuthMiddleware';
import {
  check2FA,
  adminAuth
} from '../../../middlewares/permission';

const router = Router();

router
  .post('/signup', multer({
    dest: './server/public/images'
  }).single('profileImage'), BodySchemaValidator, UserController.createUser);

router
  .post('/signin', BodySchemaValidator, UserController.signUser);

router
  .get('/profile', authMiddleware, check2FA, UserController.getProfile);

router
  .post('/2fa', authMiddleware, BodySchemaValidator, UserController.verifyAuthyToken);

router
  .post('/create/staff', authMiddleware, check2FA, adminAuth, BodySchemaValidator, UserController.createStaff);

router
  .patch('/update', authMiddleware, check2FA, BodySchemaValidator, UserController.updateDetails);

export default router;
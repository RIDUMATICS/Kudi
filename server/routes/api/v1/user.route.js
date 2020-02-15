import {
  Router
} from 'express';
import UserController from '../../../controllers/user.controller';
import BodySchemaValidator from '../../../middlewares/BodySchemaValidator';
import parser from '../../../middlewares/multer-cloudinary';
import authMiddleware from '../../../middlewares/AuthMiddleware';


const router = Router();

router
  .post('/auth/signup', BodySchemaValidator, parser.single('profileImage'), UserController.createUser);

router
  .post('/auth/signin', BodySchemaValidator, UserController.signUser);

router
  .post('/auth/2fa', authMiddleware, BodySchemaValidator, UserController.verifyAuthyToken);

export default router;
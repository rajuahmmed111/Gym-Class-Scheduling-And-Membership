import express from 'express';
import UserController from './user.controller';
import { userValidation } from './user.validation';
import { Role } from '@prisma/client';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { fileUploader } from '../../../helpers/fileUploader';

// import { parseBodyData } from '../../middlewares/parseBodyData';

const router = express.Router();

// get by user role
router.get('/get-user/:role', auth(), UserController.getUserByRole);

router.post(
  '/create',
  // validateRequest(userValidation.createUserSchema),
  UserController.createUser
);

router.put(
  '/update',
  auth(),
  // validateRequest(userValidation.createUserSchema),
  UserController.updateUser
);

// update user profile image
router.patch(
  '/profile-update/:id',
  auth(),
  fileUploader.uploadProfileImage,
  UserController.updateUserProfileImage
);

router.get('/', auth(), UserController.getAllUsers);
router.get('/:id', auth(), UserController.getUserById);

// update user first name and last name
router.put(
  '/update',
  auth(),
  // validateRequest(userValidation.createUserSchema),
  UserController.updateUser
);

// delete user
router.delete('/:id', auth(Role.ADMIN, Role.SUPER_ADMIN), UserController.deleteUser);

export const userRoute = router;

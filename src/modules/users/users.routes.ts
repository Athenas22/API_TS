import { Router } from 'express';
import { userController } from './users.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.post('/', userController.create);

userRoutes.use(authMiddleware);

userRoutes.get('/', userController.list);
userRoutes.get('/:id', userController.findById);
userRoutes.put('/:id', userController.update);
userRoutes.delete('/:id', userController.delete);
userRoutes.patch('/:id/password', userController.updatePassword);


export { userRoutes };
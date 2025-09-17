import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './modules/users/users.routes';
import { authRoutes } from './modules/auth/auth.routes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes); 

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ message: 'Algo deu errado!' });
});

export { app };
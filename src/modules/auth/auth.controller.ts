import { Request, Response } from 'express';
import { authService } from './auth.services';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}

export const authController = new AuthController();
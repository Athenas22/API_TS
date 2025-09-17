import { Request, Response } from 'express';
import { userService } from './users.service';
import { createUserSchema, updatePasswordSchema, updateUserSchema } from '../../validators/user.validators';
import { ZodError } from 'zod';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await userService.create(data);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      if (error instanceof Error) {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async list(req: Request, res: Response) {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const users = await userService.list(page, limit);
      return res.status(200).json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updateUserSchema.parse(req.body);
      const user = await userService.update(id, data);
      return res.status(200).json(user);
    } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await userService.delete(id);
        return res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updatePasswordSchema.parse(req.body);
      await userService.updatePassword(id, data.password);
      return res.status(204).send();
    } catch (error) {
       if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
      }
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  }
}

export const userController = new UserController();
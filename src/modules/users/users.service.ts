import { hash } from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { User } from '@prisma/client';

class UserService {
  async create(data: any): Promise<Omit<User, 'password'>> {
    const emailInUse = await prisma.user.findUnique({ where: { email: data.email } });
    if (emailInUse) {
      throw new Error('Este email já está em uso.');
    }
    
    const hashedPassword = await hash(data.password, 8);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async list(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await prisma.user.findMany({
      skip: skip,
      take: limit,
      select: {
        id: true, name: true, email: true, createdAt: true, updatedAt: true,
      }
    });
    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true }
    });
    return user;
  }

  async update(id: string, data: { name?: string, email?: string }) {
    const user = await prisma.user.update({
      where: { id },
      data: data,
       select: { id: true, name: true, email: true }
    });
    return user;
  }
  
  async delete(id: string) {
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
        throw new Error('Usuário não encontrado.');
    }
    await prisma.user.delete({ where: { id } });
  }

  async updatePassword(id: string, newPassword: string) {
     const hashedPassword = await hash(newPassword, 8);
     await prisma.user.update({
       where: { id },
       data: { password: hashedPassword },
     });
  }
}

export const userService = new UserService();
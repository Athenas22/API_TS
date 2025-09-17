import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import { LoginDto } from './auth.dto';

class AuthService {
  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Email ou senha inválidos.');
    }

    const isPasswordMatch = await compare(data.password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Email ou senha inválidos.');
    }
    
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Segredo JWT não configurado no .env');
    }

    const token = sign({ id: user.id }, secret, {
      expiresIn: '1d', 
    });

    return { token };
  }
}

export const authService = new AuthService();
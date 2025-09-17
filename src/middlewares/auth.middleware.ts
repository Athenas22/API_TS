import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const [, token] = authorization.split(' '); 

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('Segredo JWT não configurado.');
        }

        const data = verify(token, secret);
        const { id } = data as TokenPayload;

        return next();
    } catch {
        return res.status(401).json({ message: 'Token inválido.' });
    }
}
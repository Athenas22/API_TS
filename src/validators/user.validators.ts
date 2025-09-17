import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres."),
});

export const updateUserSchema = z.object({
    name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres.").optional(),
    email: z.string().email("Formato de e-mail inválido.").optional(),
}).refine(data => data.name || data.email, {
    message: "Pelo menos um dos campos (nome ou email) deve ser fornecido."
});

export const updatePasswordSchema = z.object({
    password: z.string().min(6, "A nova senha precisa ter no mínimo 6 caracteres."),
});
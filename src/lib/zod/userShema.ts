import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(3),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

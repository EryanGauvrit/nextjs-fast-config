import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    username: z.string(),
    password: z.string().min(3),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

export const updateUserSchema = z.object({
    name: z.optional(z.string()),
    username: z.optional(z.string()),
    password: z.optional(z.string().min(3)),
    email: z.optional(z.string().email()),
});

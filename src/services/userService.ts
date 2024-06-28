'use server';

import { headers } from 'next/headers';
import { fetchWrapper, wrapResponse } from './queryService';
import { createUserSchema, getUserByEmailSchema, updateUserSchema } from '@/lib/zod/userShema';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { isAuthanticated } from './authService';
import { AuthError } from 'next-auth';

const URL = process.env.NEXT_PUBLIC_APP_URL;

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND || ''));
};

export const createUser = wrapResponse(async (body: FormData) => {
    const { success, data, error } = createUserSchema.safeParse(Object.fromEntries(body));

    if (!success) {
        throw error;
    }

    const user = await prisma.user.create({
        data: { ...data, password: await hashPassword(data.password) },
    });

    return user;
});

export const getUserByEmail = wrapResponse(async (email: string) => {
    const user = await isAuthanticated();
    const { success, error, data } = getUserByEmailSchema.safeParse({ email });

    if (!success) {
        throw error;
    }
    if (user.email !== data.email) {
        throw new AuthError('Unauthorized');
    }
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
});

export const updateUser = wrapResponse(async (body: FormData, email: string) => {
    const user = await isAuthanticated();
    const safeEmail = getUserByEmailSchema.safeParse({ email });
    const { success, error, data } = updateUserSchema.safeParse(Object.fromEntries(body));

    if (!success || !safeEmail.success) {
        throw error;
    }
    if (user.email !== safeEmail.data.email) {
        throw new AuthError('Unauthorized');
    }

    return await prisma.user.update({
        where: {
            email,
        },
        data,
    });
});

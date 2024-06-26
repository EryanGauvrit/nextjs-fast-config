'use server';

import { loginUserSchema } from '@/lib/zod/userShema';
import { AuthError, User } from 'next-auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { auth } from 'auth';

export type LoginCredentials = {
    email: string;
    password: string;
};

export const login = async (credentials: LoginCredentials): Promise<User | null> => {
    const { success, data, error } = loginUserSchema.safeParse(credentials);
    if (!success) {
        console.log(error);
        throw new Error('Invalid data');
    }

    // get user from db
    const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            isAdmin: true,
            image: true,
            password: true,
            emailVerified: true,
        },
    });

    if (!user) {
        return null;
    }
    const validation = await bcrypt.compare(credentials.password as string, user.password as string);

    if (!validation) {
        return null;
    }

    return user as User;
};
export const isAuthanticated = async (): Promise<User> => {
    const session = await auth();
    if (!session || !session.user) {
        throw new AuthError('Unauthorized');
    }
    return session.user;
};

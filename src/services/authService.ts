import { User } from 'next-auth';
import { prisma } from '../../prisma/prisma';
import { loginUserSchema } from '@/lib/zod/userShema';
import { hashPassword } from '../../app/api/user/create/route';

export type LoginCredentials = {
    email: string | unknown;
    password: string | unknown;
};

export class AuthService {
    public static async login(credentials: LoginCredentials): Promise<User | null> {
        const { success, data, error } = loginUserSchema.safeParse(credentials);
        if (!success) {
            throw new Error('Invalid data');
        }

        // get user from db
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                isAdmin: true,
                profilePicture: true,
                password: true,
                emailVerified: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.password !== hashPassword(data.password)) {
            throw new Error('Invalid credentials');
        }

        return user as User;
    }
}

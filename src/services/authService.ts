import { loginUserSchema } from '@/lib/zod/userShema';
import { User } from 'next-auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export type LoginCredentials = {
    email: string;
    password: string;
};

export class AuthService {
    public static async login(credentials: LoginCredentials): Promise<User | null> {
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
    }
}

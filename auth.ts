import { prisma } from '@/lib/prisma';
import { AuthService } from '@/services/authService';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password';
}

export const BASE_PATH = '/api/auth';

const credentialsConfig = Credentials({
    credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
        const user = await AuthService.login({
            email: credentials.email as string,
            password: credentials.password as string,
        });
        if (!user) {
            throw new InvalidLoginError();
        }

        return user;
    },
});

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    basePath: BASE_PATH,
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
    },
    providers: [credentialsConfig],
});

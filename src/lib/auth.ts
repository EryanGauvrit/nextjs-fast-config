import { AuthService } from '@/services/authService';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password';
}
const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    cookies: {
        sessionToken: {
            name: 'sessionToken',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
            },
        },
    },
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        Credentials({
            credentials: {
                email: { label: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                const user = await AuthService.login({
                    email: credentials.email,
                    password: credentials.password,
                });
                if (!user) {
                    throw new InvalidLoginError();
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            session = token as any;
            return session;
        },
    },
});

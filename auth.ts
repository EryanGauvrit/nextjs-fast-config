import { prisma } from '@/lib/prisma';
import { login } from '@/services/authService';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Resend from 'next-auth/providers/resend';

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
        const user = await login({
            email: credentials.email as string,
            password: credentials.password as string,
        });
        if (!user) {
            throw new InvalidLoginError();
        }

        return user;
    },
});

const ResendConfig = Resend({
    from: process.env.EMAIL_FROM,
    name: 'Example',
    async sendVerificationRequest({ identifier: email, url, token, provider }) {
        const { host } = new URL(url);
        const res = await fetch(`${process.env.APP_URL}/api/emails/verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: provider.name,
                from: provider.from,
                host,
                to: email,
                url,
                token,
            }),
        });

        if (!res.ok) throw new Error('Resend error: ' + JSON.stringify(await res.json()));
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
        verifyRequest: '/auth/verify',
    },
    providers: [credentialsConfig, ResendConfig],
});

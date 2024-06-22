import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log(credentials);
                throw new InvalidLoginError();
            },
        }),
    ],
});

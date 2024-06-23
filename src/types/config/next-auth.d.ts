import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: User;
    }

    interface User {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isAdmin: boolean;
        profilePicture: string;
        password: string;
        emailVerified: Date;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
    }
}

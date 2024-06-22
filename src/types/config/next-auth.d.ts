import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: {
                name: string;
                level: number;
            };
            profilePicture: string;
            password: string;
        };
    }

    interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: {
            name: string;
            level: number;
        };
        accessToken: string;
        profilePicture: string;
        password: string;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        user: User;
    }
}

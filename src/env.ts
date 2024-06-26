import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        // APP_URL: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_APP_URL: z.string().url(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    },
    // runtimeEnv: {
    //     DATABASE_URL: process.env.DATABASE_URL,
    //     NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    // },
});

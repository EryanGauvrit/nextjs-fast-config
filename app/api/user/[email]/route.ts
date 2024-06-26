import { prisma } from '@/lib/prisma';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = auth(async (req): Promise<NextResponse> => {
    // const url = `${req.headers.get('x-forwarded-proto')}://${req.headers.get('x-forwarded-host')}/api/auth/session`;

    // const sessionRes = await fetch(url)
    // const session = await sessionRes.json()
    const session = req.auth;
    console.log('SESSION : ', session);
    if (!session) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    if (req.method === 'GET') {
        // get user by email
        return await getUserByEmailHandler(req, session.user?.email as string);
    } else {
        return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
    }
});

// function to get user by email
async function getUserByEmailHandler(req: NextRequest, email: string): Promise<any> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ user }), { status: 200 });
    } catch (e) {
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}

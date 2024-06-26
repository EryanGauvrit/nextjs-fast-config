import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import { createUserSchema } from '@/lib/zod/userShema';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
export async function POST(req: NextRequest): Promise<NextResponse> {
    if (req.method === 'POST') {
        // create user
        return await createUserHandler(req);
    } else {
        return new NextResponse(JSON.stringify({ message: 'Method Not allowed' }), { status: 405 });
    }
}
const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND || ''));
};
// function to create user in our database
async function createUserHandler(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();
    const { success, data, error } = createUserSchema.safeParse(body);
    if (!success) {
        return new NextResponse(JSON.stringify({ message: 'Invalid data' }), { status: 400 });
    }

    try {
        const user = await prisma.user.create({
            data: { ...data, password: await hashPassword(data.password) },
        });
        return new NextResponse(JSON.stringify({ user }), { status: 201 });
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return new NextResponse(JSON.stringify({ message: 'Email already exists' }), { status: 400 });
            }
            return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
        }
        return new NextResponse(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}

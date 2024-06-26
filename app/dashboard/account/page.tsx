import { User } from '@prisma/client';
import { auth } from 'auth';
import { UserCog } from 'lucide-react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

const URL = process.env.NEXT_PUBLIC_APP_URL;
const page = async () => {
    const user = (await auth())?.user;

    const response = await fetch(`${URL}/api/user/${user?.email}`, {
        method: 'GET',
        headers: headers(),
    });

    if (!response.ok) {
        console.error('Failed to fetch user data');
        notFound();
    }

    const userData = (await response.json()).user as User;

    return (
        <>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <UserCog size={26} />
                My account
            </h1>
            <p>Manage your account</p>
            <div>
                <h2 className="text-xl font-bold">Profile</h2>
                <div>
                    <p>
                        {userData.name} {userData.username}
                    </p>
                    <p>{userData.email}</p>
                </div>
            </div>
        </>
    );
};

export default page;

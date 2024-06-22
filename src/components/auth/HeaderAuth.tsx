'use client';

import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Loader from '../basics/Loader';
import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import UserPannel from './UserPannel';

const HeaderAuth = () => {
    const { data: session, status } = useSession();

    const user = session?.user as unknown as User;

    return (
        <>
            {status === 'loading' ? (
                <Loader />
            ) : (
                <>
                    {!user ? (
                        <div className="flex justify-center items-center gap-3 p-6 h-full flex-row lg:gap-1">
                            <LoginButton classNameText="hidden xl:inline" />
                            <SignupButton classNameText="hidden xl:inline" className="text-foreground" />
                        </div>
                    ) : (
                        <UserPannel user={user} />
                    )}
                </>
            )}
        </>
    );
};

export default HeaderAuth;

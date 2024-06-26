import { auth } from 'auth';
import { User } from 'next-auth';
import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import UserPannel from './UserPannel';

const HeaderAuth = async () => {
    const session = await auth();

    const user = session?.user as unknown as User;

    return (
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
    );
};

export default HeaderAuth;

import { UserCog } from 'lucide-react';

const page = () => {
    return (
        <>
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <UserCog size={26} />
                My account
            </h1>
            <p>Manage your account</p>
        </>
    );
};

export default page;

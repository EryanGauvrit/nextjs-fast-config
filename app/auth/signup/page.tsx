import { Card } from '@/components/ui/card';
import SignupForm from './form';

const Signup = () => {
    return (
        <main className="h-full flex flex-col bg-black/45 items-center justify-center flex-1">
            <Card className="max-w-md py-8 flex flex-col gap-4 my-10 w-full">
                <SignupForm />
            </Card>
        </main>
    );
};

export default Signup;

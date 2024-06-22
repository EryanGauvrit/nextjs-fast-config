import { Card } from '@/components/ui/card';
import SignupForm from './form';

const Signup = () => {
    return (
        <main className="h-full flex flex-col items-center justify-center flex-1">
            <Card className="max-w-md py-8 flex flex-col gap-4 my-10 w-full text-background bg-foreground">
                <SignupForm />
            </Card>
        </main>
    );
};

export default Signup;

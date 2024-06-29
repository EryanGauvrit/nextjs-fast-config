import { Button, Tailwind } from '@react-email/components';

type Props = {
    url: string;
    token: string;
};

const VerificationEmail = ({ url }: Props) => {
    return (
        <Tailwind>
            <div className="p-4 flex justify-center items-center flex-col h-full text-center">
                <h1 className="text-2xl font-bold uppercase">Verify your email address</h1>
                <p className="mt-4">Click the button below to verify your email address.</p>
                <Button className="mt-4 rounded-lg py-2 px-4 bg-black/90 text-white" href={url}>
                    Verify email address
                </Button>
            </div>
        </Tailwind>
    );
};

export default VerificationEmail;

/* eslint-disable react/no-unescaped-entities */

import { Card, CardHeader } from '@/components/ui/card';

const page = async () => {
    return (
        <main className="container max-w-2xl w-full my-10">
            <Card className="flex justify-center my-20">
                <CardHeader>
                    <h1 className="text-3xl font-bold text-center">Email verication sent</h1>
                    <h2 className="text-xl font-bold text-center">Check your email for a verification link</h2>
                </CardHeader>
            </Card>
        </main>
    );
};

export default page;

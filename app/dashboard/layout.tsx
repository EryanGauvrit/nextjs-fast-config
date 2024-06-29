import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserByEmail } from '@/services/userService';
import { auth } from 'auth';
import { notFound } from 'next/navigation';
import React from 'react';
import DashboardMenu from './DashboardMenu';

const dashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        notFound();
    }

    const res = await getUserByEmail(session.user.email);

    if (res.isErrored) {
        notFound();
    }
    const userFromDb = res.data;

    return (
        <main className="h-full flex">
            <DashboardMenu />
            <div className="w-4/5 p-10">
                {!userFromDb.emailVerified && (
                    <Card className="bg-warning text-warning-foreground opacity-70 text-center w-full max-w-2xl m-auto mb-10">
                        <CardHeader className="pb-0 pt-1">
                            <CardTitle className="text-lg">Don't forget to verify your email address</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-1">
                            You need to verify your email address. Check your email for a verification link.
                        </CardContent>
                    </Card>
                )}
                {children}
            </div>
        </main>
    );
};

export default dashboardLayout;

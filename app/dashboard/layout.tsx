import { auth } from '@/lib/auth';
import { notFound } from 'next/navigation';
import React from 'react';
import DashboardMenu from './DashboardMenu';

const dashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth();

    if (!session) {
        notFound();
    }
    return (
        <main className="h-full flex">
            <DashboardMenu />
            <div className="w-4/5 p-10">{children}</div>
        </main>
    );
};

export default dashboardLayout;

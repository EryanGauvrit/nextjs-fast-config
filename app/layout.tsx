import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import clsx from 'clsx';
import type { Metadata } from 'next';
import './globals.css';
import Provider from './provider';

const TITLE = 'NEXT.JS FAST CONFIGURATION';
const DESCRIPTION = 'Next.js fast configuration';
export const metadata: Metadata = {
    applicationName: TITLE,
    title: {
        default: TITLE,
        template: `%s - ${TITLE}`,
    },
    description: DESCRIPTION,
    robots: {
        index: false,
        follow: false,
    },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="h-full" suppressHydrationWarning>
            <body className={clsx('bg-background h-full')} suppressHydrationWarning>
                <TooltipProvider>
                    <Provider>
                        <div className="flex flex-col h-lvh  min-h-screen">
                            <Header />
                            <div className="flex-1 m-auto w-full container">{children}</div>
                            <Footer />
                        </div>
                        <Toaster />
                    </Provider>
                </TooltipProvider>
            </body>
        </html>
    );
}

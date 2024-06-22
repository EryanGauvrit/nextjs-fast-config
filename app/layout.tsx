import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import clsx from 'clsx';
import type { Metadata } from 'next';
import './globals.css';
import Provider from './provider';

const TITLE = 'TRAIL HORIZON';
const DESCRIPTION =
    "TRAIL HORIZON est Le moteur de recherche de vos prochaines courses de trail running. Trouvez votre prochaine course de trail running en quelques clics ! Retrouvez toutes les informations sur les courses de trail running en France et en Europe. TRAIL HORIZON offre une occasion unique de regrouper la communauté du trail running autour des courses en France et en Europe, autour du partage de l'acualité et des conseils sur le trail running.";

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

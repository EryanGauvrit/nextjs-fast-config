import { buttonVariants } from '@/components/ui/button';
import clsx from 'clsx';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export const LoginButton = ({ className, classNameText }: { className?: string; classNameText?: string }) => {
    return (
        <Link href="/auth/login" className={clsx(buttonVariants({ variant: 'secondary' }), className)}>
            <LogIn className="mr-2 h-4 w-4" />
            <p className={`${classNameText}`}>Se connecter</p>
        </Link>
    );
};

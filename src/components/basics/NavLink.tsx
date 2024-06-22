'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
};

const NavLink = ({ children, href, className, activeClassName }: NavLinkProps) => {
    const pathname = usePathname();
    return (
        <Link href={href} className={cn(className, `${pathname === href ? activeClassName : ''}`)}>
            {children}
        </Link>
    );
};

export default NavLink;

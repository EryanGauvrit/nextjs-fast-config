import Link from 'next/link';
import HeaderAuth from '../auth/HeaderAuth';
import NavLink from '../basics/NavLink';

export const Header = () => {
    const routes = [
        { href: '/', text: 'Home' },
        { href: '/price', text: 'Price' },
        { href: '/contact', text: 'Contact' },
    ];

    return (
        <header className="bg-primary text-background">
            <div className="flex justify-between items-center py-2 px-6 container m-auto">
                <div className="flex gap-12 items-center">
                    <Link href={'/'} className="text-2xl font-bold">
                        LOGO
                    </Link>
                    <nav className="flex gap-1 py-2 list-none">
                        {routes.map((route, index) => (
                            <NavLink
                                key={index}
                                href={route.href}
                                className="px-4 hover:text-warning text-background"
                                activeClassName="text-warning hover:text-secondary"
                            >
                                {route.text}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="flex gap-4 justify-center">
                    <HeaderAuth />
                </div>
            </div>
        </header>
    );
};

import { auth } from '@/lib/auth';
import { CalendarCog, PanelTop, TrendingUp, UserCog, Users } from 'lucide-react';
import { User } from 'next-auth';

interface Item {
    label: string;
    href: string;
    icon?: JSX.Element;
    description?: string;
}

export const displayMenuItem = async () => {
    const user: User = (await auth())?.user as unknown as User;
    const dashboardUrl = '/dashboard';

    const itemsMenu: Item[] = [
        {
            label: 'Dashboard',
            href: dashboardUrl,
            icon: <TrendingUp size={20} />,
            description: 'Welcome to the dashboard',
        },
        {
            label: 'Home Page',
            href: dashboardUrl + '/set-homepage',
            icon: <PanelTop size={20} />,
            description: 'Manage website home page',
        },
        {
            label: 'Events',
            href: dashboardUrl + '/events',
            icon: <CalendarCog size={20} />,
            description: 'Manage events',
        },
        {
            label: 'My account',
            href: dashboardUrl + '/account',
            icon: <UserCog size={20} />,
            description: 'Manage your account',
        },
    ];

    const itemsMenuSuperAdmin: Item[] = [
        {
            label: 'Users',
            href: dashboardUrl + '/users',
            icon: <Users size={20} />,
            description: 'Manage users',
        },
    ];

    if (user && user.isAdmin) {
        // Super Admin
        itemsMenu.push(...itemsMenuSuperAdmin);
    }
    return itemsMenu;
};

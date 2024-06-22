import NavLink from '@/components/basics/NavLink';
import { displayMenuItem } from './displayMenuItem';

const DashboardMenu = async () => {
    const itemsMenu = await displayMenuItem();
    return (
        <div className="bg-card w-1/5 h-full">
            <div className="flex items-center px-4 h-16 mt-8 pl-6">
                <h1 className="text-2xl">Menu</h1>
            </div>
            <ul className="flex flex-col items-center">
                {itemsMenu.map((item, index) => (
                    <li key={index} className={`flex items-center justify-start w-full h-12 cursor-pointer`}>
                        <NavLink
                            href={item.href}
                            className="w-full h-full px-6 flex items-center gap-2 hover:bg-muted hover:text-muted-foreground"
                            activeClassName="bg-accent text-accent-foreground hover:text-accent-foreground hover:bg-muted"
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardMenu;

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';
import { User as UserIcon } from 'lucide-react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

type UserPannelProps = {
    user: User;
};
const UserPannel = ({ user }: UserPannelProps) => {
    return (
        <React.Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger className="hidden lg:flex items-center gap-2">
                    <Avatar>
                        <AvatarImage
                            className="object-cover object-center"
                            src={user.profilePicture}
                            alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback className="bg-background text-primary hover:bg-primary hover:text-background transition-colors">
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded flex flex-col gap-2 mr-6 p-4">
                    <DropdownMenuLabel>
                        <div className="flex flex-col gap-2">
                            <p className="text-center">{`${user.firstName} ${user.lastName}`}</p>
                        </div>
                    </DropdownMenuLabel>
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem asChild>
                        <Link
                            href={'/dashboard'}
                            className={clsx(
                                buttonVariants({
                                    variant: 'default',
                                    className: 'w-full cursor-pointer',
                                }),
                            )}
                        >
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className=" w-4/5 m-auto my-2" />
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Button
                            onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                            variant="destructive"
                            className="w-full"
                        >
                            Déconnexion
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="lg:hidden">
                <CardHeader className="flex flex-col items-center p-2">
                    <Avatar>
                        <AvatarImage
                            className="object-contain object-center"
                            src={user.profilePicture}
                            alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-md font-bold">{`${user.firstName} ${user.lastName}`}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-around items-center gap-2">
                    <Link
                        href={'/dashboard'}
                        className={clsx(
                            buttonVariants({
                                variant: 'ghost',
                                className: 'w-full',
                            }),
                        )}
                    >
                        Dashboard
                    </Link>
                    <Button
                        onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
                        variant="destructive"
                        className="w-full"
                    >
                        Déconnexion
                    </Button>
                </CardContent>
            </div>
        </React.Fragment>
    );
};

export default UserPannel;

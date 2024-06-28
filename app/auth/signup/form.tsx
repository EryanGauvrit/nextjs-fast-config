/* eslint-disable react/no-unescaped-entities */
'use client';

import Loader from '@/components/basics/Loader';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createUser } from '@/services/userService';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignupForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');
        setLoading(true);
        if (password !== passwordConfirm) {
            setLoading(false);
            toast({ variant: 'destructive', title: 'Erreur', description: 'Les mots de passe ne correspondent pas' });
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        formData.delete('passwordConfirm');
        const response = await createUser(formData);
        if (!response.isErrored) {
            setLoading(false);
            const resSignin = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
            });
            if (resSignin?.ok) {
                toast({ variant: 'success', title: 'Bravo !', description: "Bienvenue dans l'équipe !" });
            }
        } else {
            setLoading(false);
            toast({ variant: response.variant, title: response.title, description: response.data });
        }
    };

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router]);

    return (
        <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center uppercase">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">First name</Label>
                        <Input required id="name" type="text" placeholder="Pierre" name="name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Last name</Label>
                        <Input required id="username" type="text" placeholder="Jean-Alexandre" name="username" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input required id="email" type="email" placeholder="m@example.com" name="email" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input required id="password" type="password" name="password" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="passwordConfirm">Confirm your password</Label>
                    <Input required id="passwordConfirm" type="password" name="passwordConfirm" />
                </div>
                {error && <span className="text-red-500 text-xs">{error}</span>}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-4">
                <Button className="w-3/4 m-auto" type="submit" variant={'outline'}>
                    Sign Up
                </Button>
                <Link href="/auth/login" className="text-sm hover:underline">
                    Already have an account ?
                </Link>
            </CardFooter>
            {loading && <Loader />}
        </form>
    );
};

export default SignupForm;

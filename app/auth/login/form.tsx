'use client';

import Loader from '@/components/basics/Loader';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        setLoading(true);
        try {
            const res = await signIn('credentials', {
                email: email,
                password: password,
                redirect: true,
                callbackUrl: '/dashboard',
            });
            if (res?.ok) {
                setLoading(false);
                toast({ variant: 'success', title: "Nous t'attendions !", description: 'Bon retour parmis les vivants !' });
            }
            if (res?.error) {
                setLoading(false);
                res.status === 401
                    ? toast({ variant: 'destructive', title: 'Mmmh ...', description: 'Email ou mot de passe incorrect' })
                    : toast({ variant: 'destructive', title: 'Erreur', description: 'Une erreur est survenue' });
            }
        } catch (error) {
            setLoading(false);
            toast({ variant: 'destructive', title: 'Mmmh ...', description: 'Une erreur est survenue' });
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
                <CardTitle className="text-2xl text-center uppercase">{forgotPassword ? 'Forgot Password' : 'Log In'}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">{forgotPassword ? 'Email used to reset password' : 'Email'}</Label>
                    <Input required id="email" type="email" placeholder="m@example.com" name="email" />
                </div>
                {!forgotPassword && (
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input required id="password" type="password" name="password" />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 pt-4">
                <Button className="w-3/4 m-auto" type="submit" variant={'outline'}>
                    {forgotPassword ? 'Send' : 'Log In'}
                </Button>
                <Button
                    className="text-sm text-background font-normal hover:underline"
                    variant={'link'}
                    onClick={(e) => {
                        e.preventDefault();
                        setForgotPassword(!forgotPassword);
                    }}
                >
                    {forgotPassword ? 'Login' : 'Forgot your password ?'}
                </Button>
                <Link href={'/auth/signup'} className="text-sm hover:underline">
                    Create an account
                </Link>
            </CardFooter>
            {loading && <Loader />}
        </form>
    );
};
export default LoginForm;

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import clsx from 'clsx';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex flex-col items-center gap-10 p-24">
            <h1 className="font-bold text-4xl">NEXT.JS FAST CONFIGURATION</h1>
            <section className="flex gap-5">
                <Link href="/price" className={clsx(buttonVariants({ variant: 'default', size: 'lg' }))}>
                    Price
                </Link>
                <Link href="/auth/login" className={clsx(buttonVariants({ variant: 'default', size: 'lg' }))}>
                    Login
                </Link>
                <Link href="/contact" className={clsx(buttonVariants({ variant: 'default', size: 'lg' }))}>
                    Contact Us
                </Link>
            </section>
            <section className="flex gap-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo obcaecati magni perferendis. Libero, accusantium
                        expedita? Natus tempore odio, eum beatae repellat assumenda doloribus, consequatur aliquam mollitia molestiae quas
                        nulla delectus.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo obcaecati magni perferendis. Libero, accusantium
                        expedita? Natus tempore odio, eum beatae repellat assumenda doloribus, consequatur aliquam mollitia molestiae quas
                        nulla delectus.
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}

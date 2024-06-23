import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
    return (
        <main className="flex flex-col items-center gap-10 p-10">
            <h1 className="text-4xl font-bold uppercase">Offers</h1>
            <section className="flex gap-10">
                <Card className="w-72 text-center bg-muted">
                    <CardHeader>
                        <CardTitle className="font-bold">100 €</CardTitle>
                        <CardDescription>Price One</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo obcaecati magni perferendis. Libero, accusantium
                        expedita? Natus tempore odio, eum beatae repellat assumenda doloribus, consequatur aliquam mollitia molestiae quas
                        nulla delectus.
                    </CardContent>
                    <CardFooter>
                        <Button className="m-auto" size={'lg'}>
                            Buy
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="w-72 scale-110 text-center bg-primary text-background">
                    <CardHeader>
                        <CardTitle className="font-bold">220 €</CardTitle>
                        <CardDescription className="text-accent">Price Two</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo obcaecati magni perferendis. Libero, accusantium
                        expedita? Natus tempore odio, eum beatae repellat assumenda doloribus, consequatur aliquam mollitia molestiae quas
                        nulla delectus.
                    </CardContent>
                    <CardFooter>
                        <Button className="m-auto" variant={'outline'} size={'lg'}>
                            Buy
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="w-72 text-center bg-muted">
                    <CardHeader>
                        <CardTitle className="font-bold">500 €</CardTitle>
                        <CardDescription>Price three</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo obcaecati magni perferendis. Libero, accusantium
                        expedita? Natus tempore odio, eum beatae repellat assumenda doloribus, consequatur aliquam mollitia molestiae quas
                        nulla delectus.
                    </CardContent>
                    <CardFooter>
                        <Button className="m-auto" size={'lg'}>
                            Buy
                        </Button>
                    </CardFooter>
                </Card>
            </section>
        </main>
    );
};

export default page;

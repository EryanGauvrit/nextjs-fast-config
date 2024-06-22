import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const page = () => {
    return (
        <main className="flex flex-col items-center gap-10 p-10">
            <h1 className="text-4xl font-bold uppercase">Contact us </h1>
            <form className="flex flex-col gap-4 max-w-2xl w-full">
                <Input name="name" type="text" placeholder="Name" />
                <Input name="email" type="email" placeholder="Email" />
                <Input name="subject" type="text" placeholder="Subject" />
                <Textarea name="message" id="message" cols={30} rows={10} placeholder="Message"></Textarea>
                <Button>Send</Button>
            </form>
        </main>
    );
};

export default page;

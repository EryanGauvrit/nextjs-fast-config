import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

type LoaderProps = {
    className?: string;
    inComponent?: boolean;
};

const Loader = ({ className, inComponent }: LoaderProps) => {
    return (
        <div
            className={cn(
                `flex justify-center items-center h-full ${!inComponent ? 'fixed top-0 left-0 z-50 bg-black/55 ' : ''}`,
                className,
            )}
        >
            <LoaderCircle className="animate-spin" />
        </div>
    );
};

export default Loader;

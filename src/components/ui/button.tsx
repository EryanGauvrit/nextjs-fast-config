import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-foreground text-background hover:bg-accent hover:text-accent-foreground',
                destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-secondary hover:text-secondary-foreground',
                outline: 'border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-accent hover:text-accent-foreground',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                warning: 'bg-warning text-warning-foreground shadow-sm hover:bg-accent hover:text-accent-foreground',
                success: 'bg-success text-success-foreground shadow-sm hover:bg-accent hover:text-accent-foreground',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
                link: 'p-0',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    tooltip?: string;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, tooltip, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return !tooltip ? (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    ) : (
        <Tooltip>
            <TooltipTrigger asChild>
                <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
            </TooltipTrigger>
            <TooltipContent side="top" className={cn(buttonVariants({ variant }))}>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
});
Button.displayName = 'Button';

export { Button, buttonVariants };

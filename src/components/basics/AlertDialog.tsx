'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { ButtonVariants } from '@/types/props/variant';
import clsx from 'clsx';

type AlertDialogCompProps = {
    title: string;
    description: string;
    closeLabel: React.ReactNode;
    confirmLabel: React.ReactNode;
    openLabel: React.ReactNode;
    variant?: ButtonVariants;
    size?: 'sm' | 'default' | 'lg' | 'icon';
    confirmAction?: () => void;
    openHasChild?: boolean;
    isSubmit?: boolean;
    className?: string;
};

const AlertDialogComp = ({
    title,
    description,
    closeLabel,
    confirmLabel,
    openLabel,
    variant,
    confirmAction,
    size,
    openHasChild = false,
    isSubmit,
    className,
}: AlertDialogCompProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={className} variant={variant} size={size} asChild={openHasChild} type={isSubmit ? 'submit' : 'button'}>
                    {openLabel}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{closeLabel}</AlertDialogCancel>
                    <AlertDialogAction
                        className={clsx(
                            buttonVariants({
                                variant: variant,
                            }),
                        )}
                        onClick={confirmAction}
                    >
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogComp;

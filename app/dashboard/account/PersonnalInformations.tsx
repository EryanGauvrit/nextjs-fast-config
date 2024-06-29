'use client';

import AlertDialogComp from '@/components/basics/AlertDialog';
import Loader from '@/components/basics/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getFileType, nullToUndefined } from '@/lib/utils';
import { getFileUrl } from '@/services/fileService';
import { updateUser } from '@/services/userService';
import { User } from '@prisma/client';
import { User as UserIcon } from 'lucide-react';
import { User as UserSession } from 'next-auth';
import { useState } from 'react';

type PersonnalInformationsProps = {
    user: User;
    userSession: UserSession;
};

const PersonnalInformations = ({ user, userSession }: PersonnalInformationsProps) => {
    const [previewPicture, setPreviewPicture] = useState<string | null>(userSession?.image || null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
    const [paramsPersonnalInformations, setParamsPersonnalInformations] = useState<FormData | null>(null);
    const { toast } = useToast();

    const getImageUrl = async (file?: File, fileUrl?: string, oldUrl?: string) => {
        if ((!file || (file && !file.name)) && !fileUrl) return null;
        const formData = new FormData();
        file && formData.append('file', new Blob([file], { type: file.type }));
        const url = await getFileUrl(formData, fileUrl, oldUrl);
        if (url.isErrored) {
            setIsLoading(false);
            toast({ variant: url.variant, title: url.title, description: url.description });
            return;
        }
        return url.data as string;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setNewProfilePicture(formData.get('image') as File);
        setParamsPersonnalInformations(formData);
    };
    const handleUpdateUser = async () => {
        if (!paramsPersonnalInformations) return;
        setIsLoading(true);
        const pictureUrl = newProfilePicture && (await getImageUrl(newProfilePicture, undefined, nullToUndefined(userSession?.image)));
        if (pictureUrl) {
            paramsPersonnalInformations.set('image', pictureUrl);
        }
        setTimeout(async () => {
            try {
                const res = await updateUser(paramsPersonnalInformations, userSession?.email as string);
                if (res.isErrored) {
                    toast({ variant: res.variant, title: res.title, description: res.data });
                } else {
                    toast({ variant: res.variant, title: res.title, description: res.description });
                }
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    const getImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) {
            setPreviewPicture(null);
            return;
        }
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewPicture(reader.result as string);
        };

        reader.readAsDataURL(files[0]);
    };

    return (
        <form className="max-w-7xl flex flex-wrap justify-center gap-x-40 my-8 m-auto" onSubmit={handleSubmit}>
            <div className="pt-5">
                <Label htmlFor="profilePicture" className="cursor-pointer flex flex-col items-center gap-2">
                    <Avatar className="w-32 h-32 bg-muted">
                        <AvatarImage className="object-cover object-center" src={previewPicture || undefined} alt={user.name || ''} />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-muted text-center">Éditer ma photo de profil</p>
                </Label>
                <input hidden type="file" id="profilePicture" name="image" onChange={getImagePreview} />
            </div>
            <div className="flex flex-col gap-4 p-4 ">
                <div className="text-xl text-center">
                    <h2 id="personnal-informations" className="uppercase font-bold">
                        Informations personnelles
                    </h2>
                </div>
                <Card className="flex flex-col justify-center p-10 gap-4 border-card bg-transparent border-2">
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full" htmlFor="firstName">
                            Prénom
                        </Label>
                        <Input id="firstname" type="text" name="name" defaultValue={`${user?.name}`} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 place-items-center">
                        <Label className="w-full" htmlFor="lastName">
                            Nom
                        </Label>
                        <Input id="lastName" type="text" name="username" defaultValue={`${user?.username}`} />
                    </div>
                    <AlertDialogComp
                        title="Modifier vos informations personnelles"
                        description="Voulez-vous vraiment modifier vos informations personnelles ?"
                        closeLabel="Annuler"
                        confirmLabel="Sauvegarder"
                        openLabel="Sauvegarder"
                        isSubmit
                        confirmAction={handleUpdateUser}
                        className="place-self-end"
                    />
                </Card>
            </div>
            {isLoading && <Loader />}
        </form>
    );
};

export default PersonnalInformations;

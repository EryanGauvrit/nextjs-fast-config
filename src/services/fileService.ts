'use server';

import { backendClient } from '@/lib/edgestore-server';
import { compressFile } from '@/lib/utils';
import { Options } from 'browser-image-compression';
import { isAuthanticated } from './authService';
import { QueryResponse, wrapResponse } from './queryService';

enum ActionFile {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

const setFile = wrapResponse(async (action: ActionFile, file?: File, fileUrl?: string, oldUrl?: string) => {
    await isAuthanticated();
    if (action === ActionFile.DELETE) {
        throw new Error('Invalid action');
    }
    if (oldUrl) {
        return await updateFileHandler(oldUrl, file, fileUrl);
    }

    return await uploadFileHandler(file, fileUrl);
});

export const deleteFile = wrapResponse(async (url: string) => {
    await isAuthanticated();
    return await deleteFileHandler(url);
});

export const getFileUrl = wrapResponse(async (formData?: FormData, fileUrl?: string, oldUrl?: string) => {
    const blobFile = formData?.get('file') as Blob | undefined;

    console.log('blobFile', blobFile);
    const file = blobFile instanceof Blob ? new File([blobFile], 'file', { type: blobFile.type }) : undefined;

    console.log('file', file);

    if ((!file || !file.name || !file.size || !file.type) && !fileUrl) {
        return { isErrored: false, data: null } as QueryResponse;
    }
    if (oldUrl) {
        return await setFile(ActionFile.UPDATE, file, fileUrl, oldUrl);
    }
    return await setFile(ActionFile.CREATE, file, fileUrl);
});

const MIME_TYPES: Record<string, string> = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};

const uploadFileHandler = async (file?: File, fileUrl?: string, fileName?: string, option?: Options): Promise<string> => {
    if ((!file || !MIME_TYPES[file.type]) && !fileUrl) {
        throw new Error('Invalid file type');
    }

    const compressedFile = await compressFile(file, fileUrl, fileName, option);
    console.log('compressedFile', compressedFile);
    const blob = await backendClient.publicFiles.upload({
        content: {
            blob: new Blob([compressedFile], { type: compressedFile.type }),
            extension: MIME_TYPES[compressedFile.type],
        },
    });
    return blob.url;
};

const updateFileHandler = async (oldUrl: string, file?: File, fileUrl?: string, fileName?: string, option?: Options): Promise<string> => {
    const compressedFile = await compressFile(file, fileUrl, fileName, option);

    const blob = await backendClient.publicFiles.upload({
        content: {
            blob: new Blob([compressedFile], { type: compressedFile.type }),
            extension: MIME_TYPES[compressedFile.type],
        },
        options: {
            replaceTargetUrl: oldUrl,
        },
    });

    return blob.url;
};

const deleteFileHandler = async (url: string): Promise<void> => {
    await backendClient.publicFiles.deleteFile({
        url,
    });
    return;
};

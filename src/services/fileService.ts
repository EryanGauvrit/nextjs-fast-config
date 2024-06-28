'use server';

import { backendClient } from '@/lib/edgestore-server';
import { Query, QueryResponse, fetchWrapper, wrapResponse } from './queryService';
import { isAuthanticated } from './authService';

export enum ActionFile {
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

export const getFileUrl = wrapResponse(async (file?: File, fileUrl?: string, oldUrl?: string | null) => {
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
const uploadFileHandler = async (file?: File, fileUrl?: string): Promise<string> => {
    if ((!file || !MIME_TYPES[file.type]) && !fileUrl) {
        throw new Error('Invalid file type');
    }

    const content: any =
        file && file.name && !fileUrl
            ? {
                  blob: new Blob([file], { type: file.type }),
                  extension: MIME_TYPES[file.type],
              }
            : {
                  url: fileUrl,
                  extension: MIME_TYPES[fileUrl?.split('.').pop() || ''],
              };

    const blob = await backendClient.publicFiles.upload({
        content,
    });
    return blob.url;
};

const updateFileHandler = async (oldUrl: string, file?: File, fileUrl?: string): Promise<string> => {
    const content: any =
        file && file.name
            ? {
                  blob: new Blob([file], { type: file.type }),
                  extension: MIME_TYPES[file.type],
              }
            : {
                  url: fileUrl,
                  extension: MIME_TYPES[fileUrl?.split('.').pop() || ''],
              };

    const blob = await backendClient.publicFiles.upload({
        content,
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

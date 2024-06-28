import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import imageCompression, { Options } from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const defaultOptions: Options = {
    initialQuality: 0.6,
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
};

const compressFileFromFile = async (file: File, options = defaultOptions) => {
    return await imageCompression(file, options);
};

const compressFileFromUrl = async (url: string, options = defaultOptions, fileName: string) => {
    const file = await imageCompression.getFilefromDataUrl(url, fileName);
    return await imageCompression(file, options);
};

export const generateRandomName = () => {
    return Math.random().toString(36).substring(2, 15) + Date.now();
};

export const compressFile = async (file?: File, url?: string, fileName?: string, options = defaultOptions) => {
    if (file) {
        return await compressFileFromFile(file, options);
    }
    if (url) {
        if (!fileName) {
            fileName = generateRandomName();
        }
        return await compressFileFromUrl(url, options, fileName);
    }
    throw new Error('No file or url provided');
};

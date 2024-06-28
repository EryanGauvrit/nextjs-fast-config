import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { Variant } from '../types/props/variant';
import { AuthError } from 'next-auth';

export type encType = 'application/json' | 'multipart/form-data';

export type Query = {
    method: string;
    body?: BodyInit | FormData;
    headers?: HeadersInit;
    authorization?: string;
    encType?: encType;
};

export type QueryResponseMini = {
    error?: string;
    isErrored: boolean;
    variant: Variant;
    title?: string;
    description?: string;
    code?: number;
};

export type QueryResponse = {
    data: any;
    isErrored: boolean;
    title?: string;
    variant: Variant;
    description?: string;
    code?: number;
};
type FetchQueryResponse = {
    data: any;
    isErrored: boolean;
    title?: string;
    variant: Variant;
    description?: string;
    code?: number;
};

// export declare class AuthError extends Error {
//     code: number;
//     constructor(message: string);
// }

export const fetchWrapper = async (url: string, query: Query): Promise<FetchQueryResponse> => {
    try {
        const encType = query.encType || 'application/json';
        const res = await fetch(url, {
            method: query.method,
            headers: query.headers,
            body: query.body,
        });
        if (!res.ok) {
            switch (res.status) {
                case 401:
                    return {
                        data: "Tu n'es pas autorisé à accéder à cette ressource.",
                        isErrored: true,
                        variant: 'destructive',
                        title: 'Erreur 401',
                        code: 401,
                    };
                case 404:
                    return {
                        data: 'Ressource non trouvée.',
                        isErrored: true,
                        variant: 'destructive',
                        title: 'Erreur 404',
                        code: 404,
                    };
                case 500:
                    return {
                        data: 'Erreur interne du serveur.',
                        isErrored: true,
                        variant: 'destructive',
                        title: 'Erreur 500',
                        code: 500,
                    };
                default:
                    return {
                        data: 'Erreur inconnue.',
                        isErrored: true,
                        variant: 'destructive',
                        title: 'Erreur inconnue',
                        code: 500,
                    };
            }
        }
        return {
            data: await res.json(),
            isErrored: false,
            variant: 'success',
            title: 'Succès',
            description: ``,
            code: res.status,
        };
    } catch (err: any) {
        console.error(err);
        return {
            data: `${JSON.stringify(err)}`,
            isErrored: true,
            variant: 'destructive',
            title: 'Erreur 500',
        };
    }
};

export const wrapResponse = <T extends (...args: any[]) => Promise<any>>(actionFn: T) => {
    return async (...args: Parameters<T>): Promise<QueryResponse> => {
        try {
            const res = await actionFn(...args);
            return {
                data: res,
                isErrored: false,
                variant: 'success',
                title: 'Succès',
                code: 200,
            };
        } catch (err: any) {
            console.error(err);
            if (err instanceof ZodError) {
                return {
                    data: err.message,
                    isErrored: true,
                    variant: 'destructive',
                    title: 'Erreur 400',
                };
            }
            if (err instanceof AuthError) {
                return {
                    data: err.message,
                    isErrored: true,
                    variant: 'destructive',
                    title: `Erreur 401`,
                };
            }
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    return {
                        data: 'Item déjà existant',
                        isErrored: true,
                        variant: 'destructive',
                        title: 'Erreur 400',
                    };
                }
                return {
                    data: 'Erreur interne du serveur',
                    isErrored: true,
                    variant: 'destructive',
                    title: 'Erreur 500',
                };
            }
            if (err instanceof Error) {
                return {
                    data: err.message,
                    isErrored: true,
                    variant: 'destructive',
                    title: 'Erreur 500',
                };
            }
            return {
                data: `${JSON.stringify(err)}`,
                isErrored: true,
                variant: 'destructive',
                title: 'Erreur 500',
            };
        }
    };
};

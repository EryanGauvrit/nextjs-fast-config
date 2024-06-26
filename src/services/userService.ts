export class UserService {
    public static async create(data: FormData) {
        try {
            const response = await fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(data)),
            });
            return response;
        } catch (error) {
            console.error(error);
            return { ok: false };
        }
    }

    public static async getByEmail(email: string) {
        const URL = process.env.NEXT_PUBLIC_APP_URL;
        try {
            const response = await fetch(`${URL}/api/user/${email}`, {
                method: 'GET',
            });
            return response;
        } catch (error) {
            console.error(error);
            return { ok: false };
        }
    }

    public static async update(data: FormData, email: string) {
        try {
            const response = await fetch(`/api/user/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(data)),
            });
            return response;
        } catch (error) {
            console.error(error);
            return { ok: false };
        }
    }
}

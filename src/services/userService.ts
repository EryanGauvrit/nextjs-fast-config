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

    public static async getByEmail(email: string, token: string) {
        try {
            const response = await fetch(`/api/user/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            console.error(error);
            return { ok: false };
        }
    }
}

export const api = {
    post: async (path: string, body?: any, token?: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || 'API request failed');
        }

        return res.json();
    },

    get: async (path: string, token?: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || 'API request failed');
        }

        return res.json();
    },

    put: async (path: string, body?: any, token?: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || 'API request failed');
        }

        return res.json();
    },

    delete: async (path: string, token?: string) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.message || 'API request failed');
        }

        return res.json();
    }
};
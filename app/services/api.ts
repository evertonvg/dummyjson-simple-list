export const api = $fetch.create({
    baseURL: 'https://dummyjson.com',

    onRequest({ options }) {
        if (process.client) {
            const token = localStorage.getItem('token')

            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        }
    }
})
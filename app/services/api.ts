export const useApi = () => {
  const { token } = useAuth()

  const api = $fetch.create({
    baseURL: '/api',

    async onRequest({ options }) {
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `${token.value}`
        }
      }
    }
  })

  return api
}
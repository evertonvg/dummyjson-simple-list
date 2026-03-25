// services/api.ts

export const useApi = () => {
  // OuseUserSession é tipado automaticamente se você criou o auth.d.ts
  const { user } = useUserSession()

  return $fetch.create({
    baseURL: '/api',

    async onRequest({ options }) {
      const token = user.value?.token

      if (token) {
    // 1. Inicializa headers como um objeto simples se estiver vazio
    options.headers = options.headers || {}

    // 2. Se for uma instância de Headers (classe nativa), usamos o método .set()
    if (options.headers instanceof Headers) {
      options.headers.set('Authorization', `Bearer ${token}`)
    } else {
      // 3. Se for um objeto comum (Record), atribuímos a chave diretamente
      // Usamos o cast para 'any' ou 'Record' aqui apenas para satisfazer o TS
      (options.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }
  }
    },

    async onResponseError({ response }) {
      // Opcional: Se a API retornar 401 (token expirado ou inválido)
      if (response.status === 401) {
        const { clear } = useUserSession()
        await clear()
        await navigateTo('/login')
      }
    }
  })
}
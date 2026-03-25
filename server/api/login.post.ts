export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        // 1. Chamada para a sua API externa
        const response = await $fetch('https://sua-api.com/login', {
            method: 'POST',
            body: body
        })

        // 2. Se sua API retorna { token: '...', user: { ... } }
        // Salva na sessão do Nuxt Auth Utils
        await setUserSession(event, {
            user: response.user,
            secure: {
                token: response.token // O JWT fica escondido aqui no servidor
            },
            loggedInAt: new Date().toISOString()
        })

        return { success: true }
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Usuário ou senha inválidos'
        })
    }
})
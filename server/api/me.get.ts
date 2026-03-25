export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    if (!session.secure?.token) {
        throw createError({ statusCode: 401, message: 'Não autorizado' })
    }

    // Chama sua API externa enviando o JWT que está na sessão
    return await $fetch('https://sua-api.com/me', {
        headers: {
            Authorization: `Bearer ${session.secure.token}`
        }
    })
})
import { FAKE_TOKEN } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body

  if (username === 'admin' && password === 'senha123') {
    return {
      accessToken: FAKE_TOKEN,
      user: {
        id: 1,
        username: 'admin',
        name: 'Administrador'
      }
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Usuário ou senha inválidos'
  })
})
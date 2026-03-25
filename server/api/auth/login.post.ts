import { FAKE_TOKEN } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body

  const isValid = username === 'admin' && password === 'senha123' // Simulação

  if (!isValid){
    throw createError({
      statusCode: 401,
      message: 'Usuário ou senha inválidos'
    })
  }

  await setUserSession(event, {
    user: {
      username: username,
      role: 'admin',
      token: FAKE_TOKEN // Opcional: guarde o token se precisar dele para chamadas externas
    },
    loggedInAt: new Date()
  })

  
  return {
    accessToken: FAKE_TOKEN,
    message: 'Login realizado com sucesso',
    user: {
      id: 1,
      username: 'admin',
      name: 'Administrador'
    }
  }
  

  
})
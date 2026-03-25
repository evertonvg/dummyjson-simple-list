export const FAKE_TOKEN = 'fake-jwt-token-123'

export function validateAuth(event: any) {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'Não autenticado' })
  }

  const token = authHeader.replace('Bearer ', '')

  if (token !== FAKE_TOKEN) {
    throw createError({ statusCode: 401, message: 'Token inválido' })
  }
}
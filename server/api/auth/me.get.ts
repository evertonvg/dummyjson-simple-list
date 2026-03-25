import { validateAuth } from '~/server/utils/auth'

export default defineEventHandler((event) => {
  validateAuth(event)

  return {
    id: 1,
    username: 'admin',
    name: 'Administrador'
  }
})
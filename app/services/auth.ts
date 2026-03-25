// services/auth.ts
import { useApi } from './api'

export const useAuthService = () => {
  const api = useApi()

  const loginRequest = (username: string, password: string) => {
    const data = {username,password}
    return api('/auth/login', {
      method: 'POST',
      body: data
    })
  }

  return { loginRequest }
}
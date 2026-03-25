import { useApi } from './api'
import type { ProductResponse } from '@/types/product'

export const getProductRequest = async (
  id: string
): Promise<ProductResponse> => {
  const api = useApi()
  const { token, getSession } = useAuth()

  if (!token.value) {
    await getSession()
  }

  return api(`/products/${id}`)
}
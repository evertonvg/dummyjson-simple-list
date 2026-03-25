import { useApi } from './api'
import type { ProductResponse } from '@/types/product'

export const getProductRequest = async (
  id: string
): Promise<ProductResponse> => {
  const api = useApi()

  return api(`/products/${id}`)
}
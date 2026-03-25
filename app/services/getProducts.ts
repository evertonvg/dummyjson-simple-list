import { useApi } from './api'
import type { ProductsResponse } from '@/types/products'

export const getProductsRequest = async (
  limit: number,
  skip: number
): Promise<ProductsResponse> => {
  const api = useApi()

  return api('/products', {
    method: 'GET',
    params: {
      limit,
      skip
    }
  })
}
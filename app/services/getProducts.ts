import { api } from './api'
import type { ProductsResponse } from '@/types/products'

export const getProductsRequest = async (limit: number, skip: number): Promise<ProductsResponse> => {
    return api(`/products?limit=${limit}&skip=${skip}`, {
        method: 'GET'
    })
}
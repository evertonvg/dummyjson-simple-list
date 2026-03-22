import { api } from './api'
import type { ProductResponse } from '@/types/product'

export const getProductRequest = async (id: string): Promise<ProductResponse> => {
    return api(`/products/${id}`, {
        method: 'GET'
    })
}
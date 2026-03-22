import type { Review } from './review';
export interface ProductResponse {
    id: number
    title: string
    description: string
    brand?: string
    price: number
    discountPercentage?: number
    rating: number
    thumbnail: string
    images: string[]
    stock: number
    availabilityStatus: string
    warrantyInformation: string
    shippingInformation: string
    reviews: Review[]
}
import { products } from '~/server/data/products'
import { validateAuth } from '~/server/utils/auth'

export default defineEventHandler((event) => {
  validateAuth(event)

  const query = getQuery(event)

  const limit = Number(query.limit) || 12
  const skip = Number(query.skip) || 0

  const paginated = products.slice(skip, skip + limit)

  return {
    products: paginated,
    total: products.length,
    skip,
    limit
  }
})
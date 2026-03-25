import { products } from '~/server/data/products'
import { validateAuth } from '~/server/utils/auth'

export default defineEventHandler((event) => {
  validateAuth(event)

  const id = Number(event.context.params?.id)

  const product = products.find(p => p.id === id)

  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Produto não encontrado'
    })
  }

  return product
})
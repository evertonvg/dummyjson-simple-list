export const products = Array.from({ length: 36 }).map((_, i) => ({
  id: i + 1,
  title: `Produto ${i + 1}`,
  description: `Descrição do produto ${i + 1}`,
  category: 'geral',

  price: Number((Math.random() * 100).toFixed(2)),
  discountPercentage: Number((Math.random() * 20).toFixed(2)),
  rating: Number((Math.random() * 5).toFixed(2)),
  stock: Math.floor(Math.random() * 100),

  brand: 'Marca X',

  availabilityStatus: Math.random() > 0.2 ? 'In Stock' : 'Out of Stock',
  warrantyInformation: '1 ano de garantia',
  shippingInformation: 'Entrega em 3-5 dias úteis',

  thumbnail: `https://picsum.photos/300/200?random=${i + 1}`,

  images: [
    `https://picsum.photos/600/400?random=${i + 1}`,
    `https://picsum.photos/600/400?random=${i + 100}`
  ],

  reviews: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, j) => ({
    rating: Math.floor(Math.random() * 5) + 1,
    comment: `Review ${j + 1} do produto ${i + 1}`,
    date: new Date().toISOString(),
    reviewerName: `Usuário ${j + 1}`,
    reviewerEmail: `user${j + 1}@test.com`
  }))
}))
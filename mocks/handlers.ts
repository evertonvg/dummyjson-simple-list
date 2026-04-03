import { http, HttpResponse } from 'msw'

// Mock data para produtos
const mockProducts = [
    {
        id: 1,
        title: 'Produto Mock 1',
        description: 'Descrição do produto mock 1',
        brand: 'Marca Mock',
        price: 99.99,
        discountPercentage: 10,
        rating: 4.5,
        thumbnail: 'https://via.placeholder.com/150',
        images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
        stock: 50,
        availabilityStatus: 'In Stock',
        warrantyInformation: '1 year warranty',
        shippingInformation: 'Ships in 1-2 business days',
        reviews: []
    },
    {
        id: 2,
        title: 'Produto Mock 2',
        description: 'Descrição do produto mock 2',
        brand: 'Marca Mock 2',
        price: 149.99,
        discountPercentage: 5,
        rating: 4.0,
        thumbnail: 'https://via.placeholder.com/150',
        images: ['https://via.placeholder.com/300'],
        stock: 30,
        availabilityStatus: 'In Stock',
        warrantyInformation: '2 year warranty',
        shippingInformation: 'Ships in 3-5 business days',
        reviews: []
    }
]

// Handlers para interceptar as chamadas de API
export const handlers = [
    // Mock para /api/products
    http.get('/api/products', () => {
        console.log('🔄 Interceptando GET /api/products')
        return HttpResponse.json({
            products: mockProducts,
            total: mockProducts.length,
            skip: 0,
            limit: 10
        })
    }),

    // Mock para /api/products/:id
    http.get('/api/products/:id', ({ params }) => {
        console.log('🔄 Interceptando GET /api/products/:id', params.id)
        const { id } = params
        const product = mockProducts.find(p => p.id === parseInt(id as string))

        if (product) {
            return HttpResponse.json(product)
        } else {
            return new HttpResponse(null, { status: 404 })
        }
    }),

    // Mock para /api/auth/login
    http.post('/api/auth/login', async ({ request }) => {
        console.log('🔄 Interceptando POST /api/auth/login')
        const body = await request.json()
        const { username, password } = body

        // Simula validação: aceita 'admin'/'senha123'
        if (username === 'admin' && password === 'senha123') {
            return HttpResponse.json({
                accessToken: 'fake-jwt-token-mock',
                message: 'Login realizado com sucesso',
                user: {
                    id: 1,
                    username: 'admin',
                    name: 'Administrador'
                }
            })
        } else {
            return new HttpResponse(
                JSON.stringify({ message: 'Usuário ou senha inválidos' }),
                { status: 401 }
            )
        }
    }),

    // Mock para /api/me
    http.get('/api/me', () => {
        console.log('🔄 Interceptando GET /api/me')
        return HttpResponse.json({
            id: 1,
            username: 'admin',
            name: 'Administrador'
        })
    }),

    // Mock para /api/auth/me
    http.get('/api/auth/me', () => {
        console.log('🔄 Interceptando GET /api/auth/me')
        return HttpResponse.json({
            id: 1,
            username: 'admin',
            name: 'Administrador'
        })
    }),

    // Adicione mais handlers conforme necessário para outras rotas
]
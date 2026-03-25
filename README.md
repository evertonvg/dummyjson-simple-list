# dummyjson-simple-list

Projeto Nuxt 4 + Pinia + Vue Query + API interna simulada com dados DummyJSON.

## Descrição

Aplicação de exemplo com login e catálogo de produtos paginado. Inclui:
- Autenticação simples (login/admin)
- Rotas protegidas usando middleware global
- Endpoint /api/products para listagem paginada
- Endpoint /api/products/:id para detalhes de produto
- API local em server/api e dados fake em server/data/products.ts
- UI com componentes e skeleton loading

## Funcionalidades

- GET /home (lista de produtos com paginação)
- GET /products/[id] (detalhes de produto)
- POST /auth/login (login com dmin/senha123)
- GET /auth/me (perfil do usuário autenticado)
- Proteção de API via header Authorization: Bearer fake-jwt-token-123

## Usuário de teste

- Usuário: dmin
- Senha: senha123
- Token retornado: ake-jwt-token-123

## Instalação



## Desenvolvimento



Acesse: http://localhost:3000.

## Scripts

- 
pm run dev - começa o servidor em modo dev
- 
pm run build - build para produção
- 
pm run preview - preview do build
- 
pm run generate - gerar site estático

## Estrutura do projeto

- pp/pages/index.vue - login
- pp/pages/home/index.vue - listagem de produtos com paginação
- pp/pages/products/[id].vue - detalhes de produto
- pp/components/ - componentes UI
- pp/services/api.ts - wrapper  com cabeçalhos auth
- pp/services/getProducts.ts - chamada listagem
- pp/services/getProduct.ts - chamada detalhe
- pp/services/auth.ts - chamada login
- server/api/auth/login.post.ts - valida dmin/senha123
- server/api/auth/me.get.ts - info do usuário
- server/api/products/index.get.ts - lista produtos com limit e skip
- server/api/products/[id].get.ts - produto por ID
- server/utils/auth.ts - validação do token

## Middleware

- pp/middleware/auth.global.ts - redireciona para / se não autenticado

## Dependências principais

- 
uxt >=4
- @tanstack/vue-query
- pinia
- @sidebase/nuxt-auth (configuração básica de sessão)
- ulma (estilos)
- ue-sonner (toasts)

## Observações

- Ajuste 
uxt.config.ts se necessário para deploy custom
- Use server/data/products.ts como fonte de exemplo; substitua com DB real em produção


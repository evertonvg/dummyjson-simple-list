// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  // 1. Se o utilizador NÃO estiver logado e tentar aceder a qualquer página que NÃO seja a de login
  if (!loggedIn.value && to.path !== '/') {
    return navigateTo('/')
  }

  // 2. Se o utilizador JÁ ESTIVER logado e tentar aceder à página de login
  if (loggedIn.value && to.path === '/') {
    return navigateTo('/home') // ou a tua página inicial pós-login
  }
})
export default defineNuxtRouteMiddleware(async (to) => {
  const user = useCookie('user');
  const userRole = useCookie('userRole');
  if (!user.value || userRole.value !== 'admin') {
    return navigateTo('/');
  }
});

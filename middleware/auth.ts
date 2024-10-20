export default defineNuxtRouteMiddleware(async (to) => {
  // const user = useCookie('user');
  // if (!user.value) {
  //   useCookie('redirect', { path: '/' }).value = to.fullPath;
  //   return navigateTo('/login');
  // }
  return navigateTo('/');
});

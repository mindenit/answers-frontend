export default defineNuxtRouteMiddleware(async (to) => {
  const user = useCookie('user');
  const { data, status } = await getUserInfo();
  if (
    !user.value ||
    status.value !== 'success' ||
    data.value?.role !== 'admin'
  ) {
    return navigateTo('/login');
  }
});

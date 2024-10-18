<script setup lang="ts">
const user = useCookie('user');
await logout();
user.value = '';
navigateTo('/');
</script>
<template></template>

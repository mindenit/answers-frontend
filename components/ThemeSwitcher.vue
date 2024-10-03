<script lang="ts" setup>
import { IconButton } from '@mindenit/ui';

const colorMode = useColorMode();

const handleClick = () => {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
};

const themeIcon = computed(() =>
  colorMode.value !== 'light' ? 'ph:moon' : 'ph:sun',
);
</script>

<template>
  <IconButton variant="ghost" :icon="themeIcon" @click="handleClick()" />
</template>

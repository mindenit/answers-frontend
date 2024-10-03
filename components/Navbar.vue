<script lang="ts" setup>
import {
  IconButton,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@mindenit/ui';

const user = useStrapiUser();
</script>

<template>
  <header
    class="grid grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr] w-full items-center relative"
  >
    <div class="flex items-center">
      <Logo />
    </div>

    <div
      class="z-50 flex justify-center items-center h-14 px-2 bg-fiord-50 border-fiord-300 dark:bg-fiord-900 rounded-xl border dark:border-fiord-700 gap-1 max-md:fixed max-md:bottom-4 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2"
    >
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger as-child>
            <NuxtLink to="/">
              <IconButton variant="ghost" icon="ph:compass" />
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent>Головна</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger as-child>
            <NuxtLink to="/search">
              <IconButton variant="ghost" icon="ph:magnifying-glass" />
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent>Пошук</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger as-child>
            <NuxtLink to="/catalogue">
              <IconButton variant="ghost" icon="ph:books" />
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent>Каталог</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
      <TooltipProvider v-if="user">
        <TooltipRoot>
          <TooltipTrigger as-child>
            <NuxtLink to="/create">
              <IconButton variant="ghost" icon="ph:plus" />
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent>Додати</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    </div>

    <div class="flex justify-end items-center">
      <ThemeSwitcher />
    </div>
  </header>
</template>

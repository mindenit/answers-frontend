<script lang="ts" setup>
import {
  Badge,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from '@mindenit/ui';

interface Props {
  type: 'question' | 'test';
  mobileBadge?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mobileBadge: false,
});

const badgeText = computed(() => {
  return props.type === 'question'
    ? 'Відвовідь на це питання була верифікована адміністрацією'
    : 'Цей тест був верифікован адміністрацією';
});
</script>
<template>
  <template v-if="props.mobileBadge === false">
    <div class="hidden md:block">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger class="cursor-default">
            <Badge color="success">Верифіковано</Badge>
          </TooltipTrigger>
          <TooltipContent>{{ badgeText }}</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    </div>
    <div class="md:hidden flex items-center justify-center">
      <Icon class="bg-christi-400" name="ph:check-circle-duotone" />
    </div>
  </template>

  <template v-else>
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger class="cursor-default">
          <Badge color="success">Верифіковано</Badge>
        </TooltipTrigger>
        <TooltipContent>{{ badgeText }}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  </template>
</template>

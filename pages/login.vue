<script lang="ts" setup>
import {
  Heading,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
  FormLabel,
  Button,
  IconButton,
} from '@mindenit/ui';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref<string | null>();

const { eyeIcon, inputType, toggleVisibility } = usePasswordVisibility();
const { login } = useStrapiAuth();

const isDisabled = computed(
  () => !email.value.trim().length && !password.value.trim().length,
);

const handleSubmit = async () => {
  try {
    await login({ identifier: email.value, password: password.value });

    router.push('/');
  } catch (e: unknown) {
    if (typeof e === 'string') {
      error.value = e;
    }

    if (e instanceof Error) {
      error.value = e.message;
    }

    error.value = e.error.message;
  }
};
</script>

<template>
  <main class="flex w-full h-full items-center justify-center">
    <form
      class="flex flex-col items-center justify-center w-[400px] h-fit space-y-4 rounded-xl dark:bg-fiord-900 p-5 border dark:border-fiord-700"
      @submit.prevent="handleSubmit"
    >
      <Heading size="medium">Логін</Heading>
      <div class="flex flex-col w-full gap-2">
        <FormLabel for="email">Електронна пошта</FormLabel>
        <TextFieldRoot>
          <TextFieldSlot>
            <Icon name="ph:envelope-simple" />
          </TextFieldSlot>
          <TextFieldInput
            v-model="email"
            name="email"
            id="email"
            type="email"
            placeholder="Введіть пошту"
            autofocus
          />
        </TextFieldRoot>
      </div>
      <div class="flex flex-col w-full gap-2">
        <FormLabel for="password">Пароль</FormLabel>
        <TextFieldRoot>
          <TextFieldSlot>
            <Icon name="ph:key" />
          </TextFieldSlot>
          <TextFieldInput
            v-model="password"
            name="password"
            id="password"
            :type="inputType"
            placeholder="Введіть пароль"
          />
          <TextFieldSlot>
            <IconButton
              v-show="password.length"
              type="button"
              variant="ghost"
              size="xs"
              :icon="eyeIcon"
              @click="toggleVisibility"
            />
          </TextFieldSlot>
        </TextFieldRoot>
      </div>
      <div class="flex w-full justify-start">
        <p class="text-amaranth-500" v-if="error">{{ error }}</p>
      </div>
      <Button class="w-full" :disabled="isDisabled">Увійти</Button>
    </form>
  </main>
</template>

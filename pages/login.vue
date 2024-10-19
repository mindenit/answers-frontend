<script lang="ts" setup>
import {
  Button,
  FormLabel,
  Heading,
  IconButton,
  Link,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from '@mindenit/ui';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref<string | null>();

const { eyeIcon, inputType, toggleVisibility } = usePasswordVisibility();

const isDisabled = computed(
  () => !email.value.trim().length && !password.value.trim().length
);

const handleSubmit = async () => {
  const {
    data,
    status,
    error: requestError,
  } = await login({
    email: email.value.trim(),
    password: password.value.trim(),
  });

  if (requestError) {
    switch (requestError.value?.data.message) {
      case authMessages.invalidEmailOrPassword:
        error.value = 'Невірна пошта або пароль';
        break;
      default:
        error.value = 'Сталася помилка';
        break;
    }
  }

  if (status.value === 'success') {
    router.push('/');
  }
};

useSeoMeta({
  title: 'Логін | Answers',
});
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
      <div class="flex w-full justify-start" v-if="error">
        <p class="text-amaranth-500">{{ error }}</p>
      </div>
      <Button class="w-full" :disabled="isDisabled">Увійти</Button>
      <div>
        Немає акаунту?
        <Link :asChild="true">
          <NuxtLink to="/signup">Зареєструватись</NuxtLink>
        </Link>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import {
  Button,
  FormLabel,
  Heading,
  IconButton,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from '@mindenit/ui';

const router = useRouter();

const email = ref('');
const password = ref('');
const login = ref('');
const error = ref<string | null>();

const { eyeIcon, inputType, toggleVisibility } = usePasswordVisibility();

const isDisabled = computed(
  () =>
    !email.value.trim().length &&
    !password.value.trim().length &&
    !login.value.trim().length
);

const handleSubmit = async () => {
  const {
    data,
    status,
    error: requestError,
  } = await signup({
    username: login.value,
    email: email.value,
    password: password.value,
  });

  if (requestError) {
    switch (requestError.value?.data.message) {
      case authMessages.userAlreadyExists:
        error.value = 'Цей користувач вже зареєстрований';
        break;
      case authMessages.userCreationFailed:
        error.value = 'Сталася помилка під час створення користувача';
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
  title: 'Реєстрація | Answers',
});
</script>

<template>
  <main class="flex w-full h-full items-center justify-center">
    <form
      class="flex flex-col items-center justify-center w-[400px] h-fit space-y-4 rounded-xl dark:bg-fiord-900 p-5 border dark:border-fiord-700"
      @submit.prevent="handleSubmit"
    >
      <Heading size="medium">Реєстрація</Heading>
      <div class="flex flex-col w-full gap-2">
        <FormLabel for="login">Логін</FormLabel>
        <TextFieldRoot>
          <TextFieldSlot>
            <Icon name="ph:envelope-simple" />
          </TextFieldSlot>
          <TextFieldInput
            v-model="login"
            name="login"
            id="login"
            type="text"
            placeholder="Введіть Ваш логін"
            autofocus
          />
        </TextFieldRoot>
      </div>
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
      <div class="">
        Вже є акаунт?
        <NuxtLink to="/login">Авторизуватись</NuxtLink>
      </div>
      <Button class="w-full" :disabled="isDisabled">Зареєструватись</Button>
    </form>
  </main>
</template>

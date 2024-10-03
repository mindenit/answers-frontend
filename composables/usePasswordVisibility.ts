export const usePasswordVisibility = () => {
  const isPasswordVisible = ref(false);

  const eyeIcon = computed(() =>
    isPasswordVisible.value ? 'ph:eye-closed' : 'ph:eye',
  );
  const inputType = computed(() =>
    isPasswordVisible.value ? 'text' : 'password',
  );

  const toggleVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  return { eyeIcon, inputType, toggleVisibility };
};

import type { Action, Modifier, ModifierFactoryOptions } from '~/types';

export const defineModifier = (
  modifier: Action<string>,
  factoryOptions: ModifierFactoryOptions = { moveSelection: true },
): Modifier => {
  return {
    modify({ textareaRef, textareaValue }) {
      const { moveSelection } = factoryOptions;

      if (textareaRef.value?.ref) {
        const textarea = textareaRef.value.ref;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        let modifiedText: string;

        if (start !== end) {
          const selectedText = textareaValue.value.slice(start, end);

          modifiedText = modifier(selectedText);

          textareaValue.value =
            textareaValue.value.slice(0, start) +
            modifiedText +
            textareaValue.value.slice(end);

          if (moveSelection) {
            textarea.setSelectionRange(start, start + modifiedText.length);
          }
        } else {
          modifiedText = modifier('');

          textareaValue.value += textareaValue.value.trim().length
            ? `\n${modifiedText}`
            : modifiedText;
        }

        textarea.focus();
      }
    },
  };
};

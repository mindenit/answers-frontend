import type { TextAreaInputComponent } from '@mindenit/ui';
import type { ShallowRef } from 'vue';
import type { Action, Block } from '~/types';

interface Args {
  inputValue: Ref<string>;
  textareaRef: Readonly<ShallowRef<TextAreaInputComponent | null>>;
}

export const useEditor = ({ inputValue, textareaRef }: Args) => {
  const parseQuesions = () => {
    const content = inputValue.value.trim();
    const blocks: Block[] = [];
    let currentBlock: Block | null = null;

    const lines = content.split('\n');
    for (let line of lines) {
      line = line.trim();

      if (line.startsWith('#')) {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          title: line.slice(1).trim(),
          answers: [],
        };
      } else if (line.startsWith('[') && line.endsWith(']')) {
        currentBlock?.answers.push(line.slice(1, -1).trim());
      }
    }

    if (currentBlock) {
      blocks.push(currentBlock);
    }

    return blocks;
  };

  const modifySelectedText = (modifier: Action<string>) => {
    if (textareaRef.value?.ref) {
      const textarea = textareaRef.value.ref;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      let modifiedText: string;

      if (start !== end) {
        const selectedText = inputValue.value.slice(start, end);
        modifiedText = modifier(selectedText);

        inputValue.value =
          inputValue.value.slice(0, start) +
          modifiedText +
          inputValue.value.slice(end);

        textarea.setSelectionRange(start, start + modifiedText.length);
      } else {
        modifiedText = modifier('');

        inputValue.value += inputValue.value.trim().length
          ? `\n${modifiedText}`
          : modifiedText;
      }

      textarea.focus();
    }
  };

  const onHashClick = () => {
    modifySelectedText((text) => `# ${text}`);
  };

  const onCorrectClick = () => {
    modifySelectedText((text) => `[${text}]`);
  };

  const blocks = computed(() => parseQuesions());

  return { blocks, onHashClick, onCorrectClick };
};

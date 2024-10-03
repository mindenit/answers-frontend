import type { TextAreaInputComponent } from '@mindenit/ui';
import type { ShallowRef } from 'vue';
import type { Callback } from '.';

export interface Block {
  title: string;
  answers: string[];
}

export interface ModifierFactoryOptions {
  moveSelection: boolean;
}

export interface ModifierOptions {
  textareaRef: Readonly<ShallowRef<TextAreaInputComponent | null>>;
  textareaValue: Ref<string>;
}

export interface Modifier {
  modify: Callback<ModifierOptions>;
}

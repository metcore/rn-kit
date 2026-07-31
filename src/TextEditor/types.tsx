import type { IconNameProps } from '../Icon';

export interface TextEditorType {
  label?: string;
  hint?: string;
  hasError?: boolean;
  onChange?: (data: string) => void;
  height?: number;
  testID?: string;
}

export interface TextEditorRef {
  getContent: () => void;
  setContent: (html: string) => void;
  clearContent: () => void;
}

export interface ExtendedTextEditorType extends TextEditorType {
  initialValue?: string;
  placeholder?: string;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  inputLabelLinkText?: string;
  inputLinkTextPlacholder?: string;
  inputLabelLinkUrl?: string;
  inputLinkUrlPlacholder?: string;
  saveLinkButtonText?: string;
  cancelLinkButtonText?: string;
  /**
   * Gates the floating toolbar. When true (default) it appears with the
   * keyboard, as before. When false it stays away even while the keyboard is
   * open -- it does not force the toolbar open on its own.
   */
  showToolbar?: boolean;
}

export type TextCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'link'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'undo'
  | 'redo'
  | 'removeFormat';

export interface ToolbarButton {
  command: TextCommand;
  /** Rendered as an icon, or as `text` when no icon fits (the headings). */
  icon?: IconNameProps;
  text?: string;
  label: string;
  /**
   * toggle  - on/off, answered by queryCommandState
   * block   - a block name compared against queryCommandValue('formatBlock')
   * action  - fires and forgets; never lights up
   * special - opens the link sheet instead of running a command
   */
  kind?: 'toggle' | 'block' | 'action' | 'special';
  isSpecial?: boolean;
}

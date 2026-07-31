import type { ToolbarButton } from './types';

// Single source of truth: the toolbar renders from this list, and the webview
// is asked about exactly these commands. Adding a button therefore cannot
// leave it without an active state -- the two used to be maintained apart, and
// five buttons were never queried at all.
export const TOOLBAR_BUTTONS: ToolbarButton[] = [
  { command: 'bold', icon: 'Bold', label: 'Bold' },
  { command: 'italic', icon: 'Italic', label: 'Italic' },
  { command: 'underline', icon: 'UnderLine', label: 'Underline' },
  { command: 'strikeThrough', icon: 'strike-through', label: 'Strike' },
  { command: 'link', icon: 'Link', label: 'Link', isSpecial: true },
  {
    command: 'insertUnorderedList',
    icon: 'list-un-ordered',
    label: 'Bullet',
  },
  { command: 'insertOrderedList', icon: 'list-ordered', label: 'Number' },
  { command: 'justifyLeft', icon: 'align-left', label: 'Left' },
  { command: 'justifyCenter', icon: 'align-center', label: 'Center' },
  { command: 'justifyRight', icon: 'align-right', label: 'Right' },
  { command: 'h1', text: 'H1', label: 'Heading 1', kind: 'block' },
  { command: 'h2', text: 'H2', label: 'Heading 2', kind: 'block' },
  { command: 'h3', text: 'H3', label: 'Heading 3', kind: 'block' },
  {
    command: 'removeFormat',
    icon: 'ban-outline',
    label: 'Clear format',
    kind: 'action',
  },
  { command: 'undo', icon: 'ArrowBackAlt', label: 'Undo', kind: 'action' },
  { command: 'redo', icon: 'ArrowForwardAlt', label: 'Redo', kind: 'action' },
];

export const TOGGLE_COMMANDS = TOOLBAR_BUTTONS.filter(
  (button) => !button.isSpecial && (button.kind ?? 'toggle') === 'toggle'
).map((button) => button.command);

export const BLOCK_COMMANDS = TOOLBAR_BUTTONS.filter(
  (button) => button.kind === 'block'
).map((button) => button.command);

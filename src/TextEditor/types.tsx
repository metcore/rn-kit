export interface TextEditorType {
  label?: string;
  hint?: string;
  hasError?: boolean;
  onChange?: (data: string) => void;
  height?: number;
}

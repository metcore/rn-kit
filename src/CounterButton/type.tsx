export interface CounterButtonType {
  variant?: 'default' | 'color';
  onChange?: (val: number) => void;
  value?: number;
  min?: number;
  max?: number;
}

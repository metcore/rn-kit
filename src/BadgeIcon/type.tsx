type Variant =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'orange'
  | 'purple';

type Size = 'small' | 'medium' | 'large';
type HexColor = `#${string}`;

export type { HexColor, Size, Variant };

export interface IconSizeStyle {
  minHeight: number;
  minWidth: number;
  padding: number;
  borderRadius: number;
}

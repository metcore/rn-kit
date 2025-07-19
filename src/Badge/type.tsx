import type { TypographyVariantProps } from '../Typography/type';

type Variant =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'orange'
  | 'purple';

type Size = 'small' | 'medium';
type HexColor = `#${string}`;

export type { Variant, Size, HexColor };

export interface SizeStyle {
  height: number;
  fontSize: TypographyVariantProps;
  paddingHorizontal: number;
  paddingVertical: number;
  borderRadius: number;
}

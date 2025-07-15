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

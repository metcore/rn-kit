import type { ImageSourcePropType } from 'react-native';

export type AvatarSizeType = 'small' | 'medium' | 'large';
export interface AvatarProps {
  size?: AvatarSizeType;
  source?: ImageSourcePropType;
  name?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: object;
  testID?: string;
}

export interface AvatarGroupProps {
  avatars?: AvatarProps[];
  maxVisible?: number;
  size?: AvatarSizeType;
  testID?: string;
}

import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import type { AvatarProps, AvatarSizeType } from './type';
import Typography from '../Typography/Typography';

const SIZE_MAP: Record<AvatarSizeType, number> = {
  small: 30,
  medium: 40,
  large: 50,
};

const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  source,
  name,
  backgroundColor = '#ccc',
  textColor = '#fff',
  style,
}) => {
  const avatarSize = SIZE_MAP[size] || SIZE_MAP.medium;

  return (
    <View
      style={[
        styles.container,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }}
        />
      ) : (
        <Typography
          variant="p2"
          weight="medium"
          style={[styles.initials, { color: textColor }]}
        >
          {name}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initials: {
    textAlign: 'center',
  },
});

export default Avatar;

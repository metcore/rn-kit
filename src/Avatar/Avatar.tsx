import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface AvatarProps {
  size?: number;
  source?: ImageSourcePropType;
  name?: string;
  backgroundColor?: string;
  textColor?: string;
  style?: object;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 50,
  source,
  name,
  backgroundColor = '#ccc',
  textColor = '#fff',
  style,
}) => {
  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <Text
          style={[styles.initials, { color: textColor, fontSize: size / 2 }]}
        >
          {getInitials(name || '')}
        </Text>
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
    fontWeight: 'bold',
  },
});

export default Avatar;

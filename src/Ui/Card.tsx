import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Color from '../Color/Color';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundImage?: any;
  backgroundColor?: string;
  borderColor?: string;
}

export default function Card({
  children,
  style,
  backgroundImage,
  backgroundColor,
  borderColor = Color.gray['100'],
}: CardProps) {
  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={[styles.imageBackground, style]}
        imageStyle={styles.imageStyle}
      >
        {children}
      </ImageBackground>
    );
  }
  return (
    <View
      style={[
        styles.container,
        style,
        typeof borderColor === 'string' && { borderColor },
        typeof backgroundColor === 'string' && { backgroundColor },
      ]}
    >
      {children}
    </View>
  );
}

const sharedCardStyle = {
  borderWidth: 1,
  borderRadius: 8,
  // borderColor: Color.gray['100'],
  padding: 10,
};

const styles = StyleSheet.create({
  container: {
    ...sharedCardStyle,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageBackground: {
    ...sharedCardStyle,
  },
  imageStyle: {
    borderRadius: 8,
  },
  inner: {
    padding: 10, // tetap kasih padding isi
  },
});

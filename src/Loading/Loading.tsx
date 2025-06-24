import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large' | number;
  color?: string;
  variant?: 'circle' | 'square';
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 'large',
  color = '#007AFF',
  variant = 'circle',
}) => {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          variant === 'square' ? styles.square : styles.circle,
        ]}
      >
        <ActivityIndicator size={size} color={color} />
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: 2000,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {},
  square: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    width: 100,
    height: 100,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default Loading;

import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import Color from '../../Color/Color';

interface AnimatedItemProps {
  value: number;
  scrollY: Animated.Value;
  index: number;
  type: 'hour' | 'minute';
}

const ITEM_HEIGHT = 40;

const AnimatedItem = React.memo(
  ({ value, scrollY, index, type }: AnimatedItemProps) => {
    const normalizedValue =
      type === 'hour' ? ((value % 24) + 24) % 24 : ((value % 60) + 60) % 60;

    const inputRange = [
      (index - 2) * ITEM_HEIGHT,
      (index - 1) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      (index + 1) * ITEM_HEIGHT,
      (index + 2) * ITEM_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.7, 0.85, 1, 0.85, 0.7],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.3, 0.6, 1, 0.6, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.item, { transform: [{ scale }], opacity }]}>
        <Text style={styles.itemText}>
          {normalizedValue.toString().padStart(2, '0')}
        </Text>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  itemText: {
    fontSize: 22,
    color: Color.gray[900],
    fontWeight: '600',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedItem;

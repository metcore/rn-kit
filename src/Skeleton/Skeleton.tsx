import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { SkeletonProps } from './type';

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 50,
  rounded = 8,
  backgroundColor = '#F0F0F0',
  shimmerColor = 'rgba(255, 255, 255, 0.7)',
  duration = 1500,
}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const skeletonWidth = useRef(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    skeletonWidth.current = event.nativeEvent.layout.width;
  };

  useEffect(() => {
    const animateShimmer = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateShimmer();

    return () => {
      shimmerAnimation.stopAnimation();
    };
  }, [shimmerAnimation, duration]);

  const shimmerTranslate = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    // Gunakan lebar skeleton untuk perhitungan yang presisi
    outputRange: [-200, skeletonWidth.current + 200],
  });

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.skeletonCard,
        {
          width,
          height,
          backgroundColor,
          borderRadius: rounded,
        } as StyleProp<ViewStyle>,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            backgroundColor: shimmerColor,
            transform: [{ translateX: shimmerTranslate }],
            borderRadius: rounded,
          },
        ]}
      />
    </View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  skeletonCard: {
    overflow: 'hidden',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    width: '90%',
    height: '100%',
    opacity: 0.3,
  },
});

import { Animated, Pressable, StyleSheet, View, Easing } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import LabelForm from '../LabelForm/LabelForm';
import Typography from '../Typography/Typography';
import Color from '../Color/Color';

interface SwitchProps {
  label?: string;
  dotColor?: string;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  hint?: string;
  hasError?: true;
  disabled?: boolean;
}
export default function Switch({
  label,
  dotColor,
  value,
  onChange,
  hint,
  hasError,
  disabled = false,
}: SwitchProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<boolean>(false);
  const currentValue = isControlled ? value : internalValue;

  const animValue = useRef(new Animated.Value(currentValue ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: currentValue ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, [currentValue, animValue]);

  const handlePress = () => {
    if (disabled) return;
    const newValue = !currentValue;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const backgroundColor =
    disabled && currentValue
      ? Color.primary[1000]
      : disabled && !currentValue
        ? Color.gray[200]
        : currentValue
          ? Color.primary[1000]
          : Color.gray[300];

  return (
    <View style={{ gap: 4, opacity: disabled ? 0.5 : 1 }}>
      {label ? <LabelForm title={label} /> : null}
      <Pressable
        style={styles.touchArea}
        onPress={handlePress}
        disabled={disabled}
      >
        <View style={[styles.track, { backgroundColor }]}>
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ translateX }],
                backgroundColor: dotColor ?? Color.base.white100,
              },
            ]}
          />
        </View>
      </Pressable>
      {hint ? (
        <Typography color={hasError ? Color.danger[500] : ''} variant="t2">
          {hint}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  touchArea: {},
  track: {
    width: 36,
    height: 20,
    padding: 2,
    borderRadius: 10,
    justifyContent: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: 2,
    left: 2,
  },
});

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
  value: defaultValue = false,
  onChange,
  hint,
  hasError,
  disabled = false,
}: SwitchProps) {
  const [value, setValue] = useState<boolean>(defaultValue);
  const animValue = useRef(new Animated.Value(defaultValue ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, [value, animValue]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handlePress = () => {
    if (disabled) return;
    const newValue = !value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const backgroundColor =
    disabled && value
      ? Color.primary[1000]
      : disabled && !value
        ? Color.gray[200]
        : value
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
                backgroundColor: dotColor ? dotColor : Color.base.white100,
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

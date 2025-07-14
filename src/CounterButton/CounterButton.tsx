import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Color from '../Color/Color';
import Icon from '../Icon';
import Typography from '../Typography/Typography';
import type { CounterButtonType } from './type';

export default function CounterButton({
  variant = 'default',
  onChange,
  value = 0,
  min,
  max,
}: CounterButtonType) {
  const [count, setCount] = useState<number>(value);

  const handlePressButton = (type: 'decrease' | 'increase') => {
    let tempValue = count;

    if (type === 'decrease') {
      if (min === undefined || tempValue > min) {
        tempValue = count - 1;
      }
    }

    if (type === 'increase') {
      if (max === undefined || tempValue < max) {
        tempValue = count + 1;
      }
    }

    if (tempValue !== count) {
      setCount(tempValue);
      onChange?.(tempValue);
    }
  };

  useEffect(() => {
    if (value !== count) {
      setCount(value);
    }
  }, [value, count]);

  return (
    <View
      style={[
        styles.container,
        variant === 'default' ? styles.containerDefault : {},
      ]}
    >
      <Pressable
        style={[
          variant === 'default' ? styles.buttonDefault : styles.buttonColor,
        ]}
        onPress={() => handlePressButton('decrease')}
      >
        <Icon
          name="Minus"
          color={
            variant == 'default' ? Color.primary[1000] : Color.base.white100
          }
          size={10}
        />
      </Pressable>
      <Typography variant="t3">{count}</Typography>
      <Pressable
        style={[
          variant === 'default' ? styles.buttonDefault : styles.buttonColor,
        ]}
        onPress={() => handlePressButton('increase')}
      >
        <Icon
          name="Plus"
          color={
            variant === 'default' ? Color.primary[1000] : Color.base.white100
          }
          size={10}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  containerDefault: {
    borderWidth: 1,
    borderColor: Color.gray[500],
    borderRadius: 8,
    justifyContent: 'center',
    width: 81,
    height: 28,
  },
  buttonColor: {
    borderRadius: 50,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary[1000],
  },
  buttonDefault: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

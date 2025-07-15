import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import Color from '../Color/Color';
import Icon from '../Icon';
import type { CounterButtonType } from './type';
import { fontSizeMap } from '../Typography/type';

export default function CounterButton({
  variant = 'default',
  onChange,
  value = 0,
  min,
  max,
  disabledDecrease = false,
  disabledIncrease = false,
}: CounterButtonType) {
  const [count, setCount] = useState<number>(value);
  const [inputValue, setInputValue] = useState<string>(String(value));

  const handlePressButton = (type: 'decrease' | 'increase') => {
    let tempValue = count;

    if (type === 'decrease') {
      if ((min === undefined || tempValue > min) && !disabledDecrease) {
        tempValue = count - 1;
      }
    }

    if (type === 'increase') {
      if ((max === undefined || tempValue < max) && !disabledIncrease) {
        tempValue = count + 1;
      }
    }

    if (tempValue !== count) {
      setCount(tempValue);
      setInputValue(String(tempValue));
      onChange?.(tempValue);
    }
  };

  const handleInputChange = (text: string) => {
    const numeric = text.replace(/[^0-9]/g, '');
    setInputValue(numeric);
    const parsed = parseInt(numeric, 10);
    if (!isNaN(parsed)) {
      let newValue = parsed;
      if (min !== undefined && newValue < min) newValue = min;
      if (max !== undefined && newValue > max) newValue = max;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (value !== count) {
      setCount(value);
      setInputValue(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const isDecreaseDisabled =
    disabledDecrease || (min !== undefined && count <= min);
  const isIncreaseDisabled =
    disabledIncrease || (max !== undefined && count >= max);

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
          isDecreaseDisabled && variant === 'color'
            ? styles.buttonColorDisabled
            : {},
        ]}
        disabled={isDecreaseDisabled}
        onPress={() => handlePressButton('decrease')}
      >
        <Icon
          name="Minus"
          color={
            isDecreaseDisabled
              ? variant === 'color'
                ? Color.gray[200]
                : Color.gray[500]
              : variant === 'default'
                ? Color.primary[1000]
                : Color.base.white100
          }
          size={10}
        />
      </Pressable>

      <TextInput
        style={[
          styles.input,
          { fontSize: fontSizeMap['t3'], color: Color.gray[900] },
        ]}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
      />

      <Pressable
        style={[
          variant === 'default' ? styles.buttonDefault : styles.buttonColor,
          isIncreaseDisabled && variant === 'color'
            ? styles.buttonColorDisabled
            : {},
        ]}
        disabled={isIncreaseDisabled}
        onPress={() => handlePressButton('increase')}
      >
        <Icon
          name="Plus"
          color={
            isIncreaseDisabled
              ? variant === 'color'
                ? Color.gray[200]
                : Color.gray[500]
              : variant === 'default'
                ? Color.primary[1000]
                : Color.base.white100
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
  buttonColorDisabled: {
    backgroundColor: Color.gray[400],
  },
  buttonDefault: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 24,
    height: 20,
    textAlign: 'center',
    padding: 0,
  },
});

import { Pressable, StyleSheet, View } from 'react-native';
import Color from '../Color/Color';
import React, { useState, useEffect } from 'react';
import LabelForm from '../LabelForm/LabelForm';
import type { ColorProps } from 'react-native-svg';
import type { TextInputProps } from 'react-native'; // tetap boleh di-extend
import Typography from '../Typography/Typography';

interface SwitchProps extends TextInputProps {
  /** Tulisan label di atas switch (opsional) */
  label?: string;
  /** Warna bulatan switch (opsional) */
  dotColor?: ColorProps;
  /** Nilai awal switch (opsional, default: false) */
  value?: boolean;
  /** Dipanggil setiap kali nilai berubah */
  onChange?: (newValue: boolean) => void;
  hint: string;
  hasError: true;
}

export default function Switch({
  label,
  dotColor,
  value: defaultValue = false,
  onChange,
  hint,
  hasError,
}: SwitchProps) {
  const [value, setValue] = useState<boolean>(defaultValue);

  const position: Record<boolean, 'flex-start' | 'flex-end'> = {
    false: 'flex-start',
    true: 'flex-end',
  };

  const handlePress = () => {
    const newValue = !value;
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <View style={{ gap: 4 }}>
      {label ? <LabelForm title={label} /> : null}

      <Pressable style={styles.touchArea} onPress={handlePress}>
        <View style={styles.track}>
          <View
            style={[
              styles.circle,
              {
                alignSelf: position[value],
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
    backgroundColor: Color.gray[300],
    borderRadius: 10,
    justifyContent: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});

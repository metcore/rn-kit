import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Color from '../Color/Color';
import LabelForm from '../LabelForm/LabelForm';
import Typography from '../Typography/Typography';

type InputOtpProps = {
  length?: number;
  onChange?: (otp: string) => void;
  label?: string;
  hint?: string;
  hasError?: boolean;
};

const InputOtp: React.FC<InputOtpProps> = ({
  length = 6,
  onChange,
  label,
  hint,
  hasError,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const values = useRef<string[]>(Array(length).fill(''));

  const handleChange = (text: string, index: number) => {
    values.current[index] = text;
    onChange?.(values.current.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      !values.current[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.gap4}>
      {label ? <LabelForm title={label} /> : null}
      <View style={styles.container}>
        {Array(length)
          .fill(0)
          .map((_, i) => (
            <TextInput
              key={i}
              style={[
                styles.input,
                { borderColor: hasError ? Color.danger[500] : Color.gray[200] },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              ref={(ref) => void (inputs.current[i] = ref)}
            />
          ))}
      </View>

      {hint ? (
        <Typography color={hasError ? Color.danger[500] : ''} variant="t2">
          {hint}
        </Typography>
      ) : null}
    </View>
  );
};

export default InputOtp;

const styles = StyleSheet.create({
  gap4: {
    gap: 4,
  },
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    color: Color.base.black100,
    fontSize: 12,
    fontWeight: 'medium',
  },
});

import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Color from '../Color/Color';
import LabelForm from '../LabelForm/LabelForm';
import Typography from '../Typography/Typography';

type InputOtpProps = {
  length?: number;
  onChange?: (otp: string) => void;
  label?: string;
  hint?: string;
  hasError?: boolean;
  inputCenter?: boolean;
};

const InputOtp: React.FC<InputOtpProps> = ({
  length = 6,
  onChange,
  label,
  hint,
  hasError,
  inputCenter = false,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const values = useRef<string[]>(Array(length).fill(''));
  const [useFlexGrow, setUseFlexGrow] = useState<boolean>(false);

  const containerWidth = useRef(0);
  const itemWidth = 48;
  const itemGap = 10;

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
      <View
        style={[
          styles.container,
          { justifyContent: inputCenter ? 'center' : 'flex-start' },
        ]}
        onLayout={(e) => {
          // cek apakah lebar container itu cukup untuk menampilkan semua input
          containerWidth.current = e.nativeEvent.layout.width;
          const totalNeededWidth = length * itemWidth + (length - 1) * itemGap;
          setUseFlexGrow(totalNeededWidth > containerWidth.current);
        }}
      >
        {Array(length)
          .fill(0)
          .map((_, i) => (
            <TextInput
              key={i}
              style={[
                styles.input,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  borderColor: hasError ? Color.danger[500] : Color.gray[200],
                  width: useFlexGrow ? undefined : itemWidth, //jika cukup gunakan 48px
                  flexGrow: useFlexGrow ? 1 : 0, //jika tidak cukup, flexgrow 0
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              ref={(ref) => {
                inputs.current[i] = ref;
              }}
            />
          ))}
      </View>

      {hint ? (
        <Typography color={hasError ? Color.danger[500] : ''} variant="t3">
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
  },
  input: {
    flexGrow: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    color: Color.base.black100,
    fontSize: 12,
    fontWeight: 500,
  },
});

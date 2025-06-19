import { StyleSheet, TextInput, View } from 'react-native';
import LabelForm from '../LabelForm/LabelForm';
import Color from '../Color/Color';
import Typography from '../Typography/Typography';
import type { TextAreaProps } from './type';

export default function TextArea({
  height = 116,
  label,
  hasError,
  style,
  hint,
  onChangeText,
}: TextAreaProps) {
  const handleOnChangeText = (value: string) => {
    onChangeText?.(value);
  };

  return (
    <View style={styles.gap}>
      {label ? <LabelForm title={label} /> : null}

      <View
        style={[
          styles.container,
          {
            borderColor: hasError ? Color.danger[500] : Color.gray[100],
            height,
          },
        ]}
      >
        <TextInput
          onChangeText={handleOnChangeText}
          editable
          multiline
          numberOfLines={14}
          style={[styles.input, style]}
          textAlignVertical="top"
        />
      </View>
      {hint ? (
        <Typography color={hasError ? Color.danger[500] : ''} variant="t2">
          {hint}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  gap: {
    gap: 4,
  },
  container: {
    position: 'relative',
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: Color.base.white100,
  },
  input: {
    fontSize: 14,
    color: '#333',
    padding: 12,
    textAlignVertical: 'top',
    flex: 1,
  },
});

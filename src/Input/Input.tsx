import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../Icon';
import Color from '../Color/Color';
import LabelForm from '../LabelForm/LabelForm';
import Typography from '../Typography/Typography';
import type { InputProps } from './type';

const Input: React.FC<InputProps> = ({
  icon,
  iconRight,
  label,
  style,
  value,
  clearButton = false,
  hasError = false,
  hint,
  onChangeText,
  onPressIconLeft,
  onPressIconRight,
  secureTextEntry = false,
  iconRightColor,
  prefix,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleClear = () => {
    setInputValue('');
    onChangeText?.('');
  };

  const handleChange = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  const showRightIcons = (clearButton && inputValue !== '') || iconRight;

  return (
    <View style={styles.gap}>
      {label ? <LabelForm title={label} /> : null}

      <View
        style={[
          styles.container,
          {
            borderColor: hasError ? Color.danger[500] : Color.gray[100],
          },
        ]}
      >
        {icon && (
          <TouchableOpacity onPress={onPressIconLeft} hitSlop={10}>
            <Icon name={icon} size={20} color="#888" />
          </TouchableOpacity>
        )}

        {prefix && <View style={styles.prefixContainer}>{prefix}</View>}

        <TextInput
          {...rest}
          style={[styles.input, style]}
          secureTextEntry={secureTextEntry}
          value={inputValue}
          onChangeText={handleChange}
          placeholderTextColor={Color.gray[400]}
        />

        {showRightIcons && (
          <View style={styles.rightContainer}>
            {clearButton && inputValue !== '' && (
              <TouchableOpacity
                onPress={handleClear}
                style={iconRight && styles.mr8}
              >
                <Icon name="x-circle" size={20} color="#aaa" />
              </TouchableOpacity>
            )}
            {iconRight && (
              <TouchableOpacity onPress={onPressIconRight} hitSlop={10}>
                <Icon
                  name={iconRight}
                  size={20}
                  color={iconRightColor ?? '#888'}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      {hint ? (
        <Typography
          color={hasError ? Color.danger[500] : Color.gray[700]}
          variant="t3"
          weight="medium"
        >
          {hint}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    gap: 4,
  },
  container: {
    position: 'relative',
    height: 40,
    borderRadius: 8,
    gap: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    backgroundColor: Color.base.white100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 37,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mr8: {
    marginRight: 8,
  },
});

export default Input;

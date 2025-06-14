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
          <TouchableOpacity
            onPress={onPressIconLeft}
            style={styles.iconLeft}
            hitSlop={10}
          >
            <Icon name={icon} size={18} color="#888" />
          </TouchableOpacity>
        )}

        <TextInput
          {...rest}
          style={[
            styles.input,
            icon && { paddingLeft: 40 },
            showRightIcons && { paddingRight: 60 },
            style,
          ]}
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
                style={[{ marginRight: iconRight ? 8 : 0 }]}
              >
                <Icon name="x-circle" size={18} color="#aaa" />
              </TouchableOpacity>
            )}
            {iconRight && (
              <TouchableOpacity onPress={onPressIconRight} hitSlop={10}>
                <Icon name={iconRight} size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {hint ? (
        <Typography color={hasError ? Color.danger[500] : ''} variant="t2">
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
    height: 36,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    backgroundColor: Color.base.white100,
    justifyContent: 'center',
  },
  input: {
    height: 37,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  iconLeft: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightContainer: {
    position: 'absolute',
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default Input;

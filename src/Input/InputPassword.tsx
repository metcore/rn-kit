import React, { useState } from 'react';
import { View } from 'react-native';
import Input from './Input';
import type { TextInputProps } from 'react-native';

interface InputPasswordProps extends TextInputProps {
  icon?: string;
  iconRight?: string;
  clearButton?: boolean;
  label?: string;
  hint?: string;
  hasError?: boolean;
  onPressIconLeft?: () => void;
  onPressIconRight?: () => void;
}

export default function InputPassword(props: InputPasswordProps) {
  const [secureText, setSecureText] = useState(true);

  return (
    <View>
      <Input
        {...props}
        iconRight={secureText ? 'Eye' : 'User'}
        secureTextEntry={secureText}
        onPressIconRight={() => setSecureText(!secureText)}
      />
    </View>
  );
}

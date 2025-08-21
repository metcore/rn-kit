import { Color, Icon, Typography } from '@herca/rn-kit';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { Variant } from './type';
// import type { ColorVariantType } from '../Color/type';

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string | React.ReactNode;
  hint?: string;
  disabled?: boolean;
  renderLabel?: () => React.ReactNode;
  renderHint?: () => React.ReactNode;
  color?: Variant;
}

const COLORS: Record<Variant, { background: string; borderColor: string }> = {
  default: { background: Color.gray[100], borderColor: Color.gray[500] },
  primary: {
    background: Color.primary[1000],
    borderColor: Color.primary[1000],
  },
  success: { background: Color.success[500], borderColor: Color.success[500] },
  info: { background: Color.info[500], borderColor: Color.info[500] },
  danger: { background: Color.danger[500], borderColor: Color.danger[500] },
  warning: { background: Color.warning[500], borderColor: Color.warning[500] },
  orange: { background: Color.orange[500], borderColor: Color.orange[500] },
  purple: { background: Color.purple[500], borderColor: Color.purple[500] },
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  onChange,
  label,
  hint,
  disabled = false,
  renderLabel,
  renderHint,
  color = 'primary',
}) => {
  const [value, setValue] = useState<boolean>(false);
  const { background, borderColor } = COLORS[color];

  const handlePress = () => {
    const newValue = !value;
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  return (
    <Pressable
      onPress={() => !disabled && handlePress()}
      style={styles.container}
    >
      <View
        style={[
          styles.checkBox,
          value && {
            backgroundColor: background,
            borderColor,
          },
          disabled && styles.disabled,
        ]}
      >
        {value && <Icon name="Check" size={14} color={Color.base.white100} />}
      </View>
      <View>
        {label && (
          <Typography variant="t2" weight="medium" color={Color.gray[900]}>
            {label}
          </Typography>
        )}
        {hint && (
          <Typography variant="t3" weight="medium" color={Color.gray[600]}>
            {hint}
          </Typography>
        )}
      </View>
      <View>
        {renderLabel?.()}
        {renderHint?.()}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Color.gray[500],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 8,
  },
  checked: {
    backgroundColor: Color.primary[1000],
    borderColor: Color.primary[1000],
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CheckBox;

import {
  Badge,
  Color,
  Icon,
  Select,
  Typography,
  type ChipOptionProps,
  type IconNameProps,
} from '@herca/rn-kit';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { spacing } from '../styles/spacing';
import { border } from '../styles/border';
import { layouting } from '../styles/layouting';
import type { Variant } from '../Badge/type';

type SelectProps = React.ComponentProps<typeof Select>;
type SelectPropsWithoutData = Omit<SelectProps, 'data'>;

interface Props extends React.ComponentProps<typeof Pressable> {
  label: string;
  placeholder?: string;
  options?: ChipOptionProps[];
  selectProps?: SelectPropsWithoutData;
  value?: string;
  onSelectClick?: () => void;
  onSelectClose?: () => void;
  icon?: IconNameProps;
  iconColor?: string;
  hasError?: boolean;
  hint?: string;
  onClear?: () => void;
  subtitle?: string;
  badge?: {
    value: string;
    color: Variant;
  };
  useModal?: boolean;
}

export default function InputSelect({
  label,
  placeholder = 'Select here...',
  selectProps,
  options,
  value,
  onSelectClick,
  onSelectClose,
  icon,
  iconColor,
  hint,
  hasError,
  onClear,
  subtitle,
  badge,
  useModal = true,
  ...props
}: Props) {
  const [isSelectOpen, setSelectOpen] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState(value);

  function handleOpenSelect() {
    useModal && setSelectOpen(true);
    onSelectClick?.();
  }

  function handleCloseSelect() {
    setSelectOpen(false);
    onSelectClose?.();
  }

  function handleClear() {
    setInternalValue('');
    onClear?.();
  }

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <View style={spacing.gap[4]}>
      <Typography variant="t2" weight="semibold" color={Color.gray[900]}>
        {label}
      </Typography>

      <View style={[spacing.gap[4], layouting.flex.grow]}>
        <Pressable
          style={[
            styles.select,
            hasError && border.color.danger[300],
            internalValue !== '' && !hasError && border.color.primary[300],
          ]}
          onPress={handleOpenSelect}
          {...props}
        >
          {/* left icon, value and placeholder */}
          <View
            style={[
              layouting.flex.rowCenter,
              spacing.gap[12],
              layouting.flex.shrink,
              layouting.flex[1],
            ]}
          >
            {icon && <Icon name={icon} size={20} color={iconColor} />}
            <View>
              <View style={[layouting.flex.rowCenter, spacing.gap[4]]}>
                <Typography
                  variant="t2"
                  color={Color.gray[900]}
                  weight="medium"
                  numberOfLines={1}
                >
                  {!internalValue ? placeholder : internalValue}
                </Typography>
                {badge ? (
                  <Badge value={badge.value} size="small" color={badge.color} />
                ) : null}
              </View>

              {subtitle && (
                <Typography
                  variant="t3"
                  color={Color.gray[700]}
                  weight="medium"
                  numberOfLines={1}
                >
                  {subtitle}
                </Typography>
              )}
            </View>
          </View>

          {/* right icon and action */}
          <View style={[layouting.flex.rowCenter, spacing.gap[8]]}>
            {onClear && internalValue && (
              <TouchableOpacity activeOpacity={0.7} onPress={handleClear}>
                <Icon name="x-circle" size={20} color="#aaa" />
              </TouchableOpacity>
            )}
            <Icon
              name={useModal ? 'ArrowDown' : 'ArrowRight'}
              size={useModal ? 14 : 12}
              color={Color.gray[700]}
            />
          </View>
        </Pressable>

        {hint && (
          <Typography
            variant="t3"
            color={hasError ? Color.danger[500] : Color.gray[700]}
            weight="medium"
            numberOfLines={1}
          >
            {hint}
          </Typography>
        )}
      </View>

      {useModal && (
        <Select
          isOpen={isSelectOpen}
          {...selectProps}
          data={options ?? []}
          onClose={handleCloseSelect}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.gray[200],
    gap: 8,
  },
});

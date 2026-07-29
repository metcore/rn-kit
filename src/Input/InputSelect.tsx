import Badge from '../Badge/Badge';
import Color from '../Color/Color';
import Icon from '../Icon/Icon';
import LabelForm from '../LabelForm/LabelForm';
import Select from '../Select/Select';
import Typography from '../Typography/Typography';
import type { ChipOptionProps } from '../Chip/type';
import type { IconNameProps } from '../Icon/type';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { spacing } from '../styles/spacing';
import { border } from '../styles/border';
import { layouting } from '../styles/layouting';
import type { Variant } from '../Badge/type';
import { getTestID } from '../helpers/getTestID';

type SelectProps = React.ComponentProps<typeof Select>;
type SelectPropsWithoutData = Omit<SelectProps, 'data'>;

interface Props extends React.ComponentProps<typeof Pressable> {
  required?: boolean;
  labelColor?: string;
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
  required,
  labelColor,
  testID,
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

  // Strip any caller-provided testID out of selectProps before spreading it
  // onto <Select>, so it can never clobber the derived `-sheet` id below.
  const selectPropsWithoutTestID = { ...selectProps };
  delete selectPropsWithoutTestID.testID;

  return (
    <View style={spacing.gap[4]}>
      <LabelForm
        testID={getTestID(testID, 'label')}
        title={label}
        required={required}
        color={labelColor}
      />

      <View style={[spacing.gap[4], layouting.flex.grow]}>
        <Pressable
          testID={getTestID(testID, 'trigger')}
          style={[
            styles.select,
            hasError && border.color.danger[300],
            internalValue && !hasError && border.color.primary[300],
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
              <TouchableOpacity
                testID={getTestID(testID, 'clear')}
                activeOpacity={0.7}
                onPress={handleClear}
              >
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
            testID={getTestID(testID, 'error')}
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
          testID={testID}
          isOpen={isSelectOpen}
          {...selectPropsWithoutTestID}
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

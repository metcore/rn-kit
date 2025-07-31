import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Typography from '../Typography/Typography';
import { CHIP_COLOR_MAP, type ChipItem, type ChipOptionProps } from './type';
import type { ColorVariantType } from '../Color/type';

export default function ChipItem({
  item,
  isSelected,
  color = 'default',
  block,
  size,
  renderItem,
  isHorizontal,
  onPress,
  onLayout,
}: ChipItem) {
  const validColors: ColorVariantType[] = [
    'default',
    'success',
    'danger',
    'primary',
    'warning',
    'info',
    'purple',
    'orange',
  ];

  const safeColor = validColors.includes(color) ? color : 'default';
  const colors = CHIP_COLOR_MAP[safeColor];

  const selectedState = isSelected(item.value ? true : false);
  const isDisabled = item.disabled ?? false;

  const dynamicStyle: ViewStyle = {
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundColor,
  };

  if (selectedState) {
    dynamicStyle.borderColor = colors.selectedBorderColor;
    dynamicStyle.backgroundColor = colors.selectedBackgroundColor;
  }

  if (isDisabled) {
    dynamicStyle.borderColor = colors.disabledBorderColor;
    dynamicStyle.backgroundColor = colors.disabledBackgroundColor;
  }

  const isBlockMode = block && !isHorizontal;

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.chipSmall;
      case 'large':
        return styles.chipLarge;
      case 'medium':
      default:
        return styles.chipMedium;
    }
  };

  const handleOnPres = (disabled: boolean, val: ChipOptionProps) => {
    onPress?.(disabled, val);
  };

  return (
    <Pressable
      key={item.value}
      style={[
        styles.chip,
        getSizeStyle(),
        dynamicStyle,
        isBlockMode && styles.blockChip,
      ]}
      onPress={() => handleOnPres(isDisabled, item)}
      disabled={isDisabled}
      onLayout={onLayout}
    >
      {renderItem ? (
        renderItem(item, selectedState, isDisabled)
      ) : (
        <Typography
          variant="t2"
          style={{
            fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
            color: isDisabled
              ? colors.disabledTextColor
              : selectedState
                ? colors.selectedTextColor
                : colors.textColor,
          }}
        >
          {item.label}
        </Typography>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  chip: {
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  chipSmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  chipMedium: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  chipLarge: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  blockChip: {
    width: '100%',
    alignSelf: 'stretch',
  },
});

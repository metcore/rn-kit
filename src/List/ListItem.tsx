import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Color from '../Color/Color';
import Theme from '../Theme/Theme';
import type { ListItemProps } from './type';

export default function ListItem({
  children,
  onPress,
  style,
  isLast = false,
}: ListItemProps) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      style={[styles.container, !isLast && styles.withBorder, style]}
    >
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Color.base.white100,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Color.gray[100],
  },
});

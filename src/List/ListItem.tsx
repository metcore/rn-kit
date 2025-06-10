import { type ReactNode } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Color from '../Color/Color';
import Theme from '../Theme/Theme';

interface ListItemProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isLast?: boolean;
}

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

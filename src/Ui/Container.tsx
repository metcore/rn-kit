import { StyleSheet, View, type ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Container({ children, style }: Props) {
  return <View style={[styles.container, style && style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});

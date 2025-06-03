import { StyleSheet, View } from 'react-native';

export default function Container({ children, style }: any) {
  return <View style={[styles.container, style && style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});

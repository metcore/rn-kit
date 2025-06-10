import { View, StyleSheet, type ViewStyle } from 'react-native';

interface CenterProps {
  children: React.ReactNode;
  size?: number;
  style?: ViewStyle;
}

const Center = ({ children, style }: CenterProps) => {
  return <View style={[styles.center, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default Center;

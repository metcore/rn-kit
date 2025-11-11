import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';

interface CenterProps {
  children: React.ReactNode;
  size?: number;
  style?: StyleProp<ViewStyle>;
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

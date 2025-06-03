import { View, StyleSheet } from 'react-native';

const Center = ({ children, style }) => {
  return <View style={[styles.center, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default Center;

import { View, StyleSheet } from 'react-native';
import Color from '../Color/Color';

const Divider = ({ testID }: { testID?: string } = {}) => {
  return <View testID={testID} style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Color.gray[200],
  },
});

export default Divider;

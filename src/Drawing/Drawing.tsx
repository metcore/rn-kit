import { StyleSheet, View, Text } from 'react-native';

export default function Drawing() {
  return (
    <View style={styles.container}>
      <Text>Sedang di bangun</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

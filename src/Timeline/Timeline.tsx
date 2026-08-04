import { StyleSheet, View } from 'react-native';

interface Timeline {
  children: React.ReactNode;
  testID?: string;
}

export default function Timeline({ children, testID }: Timeline) {
  return (
    <View testID={testID} style={styles.gap14}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  gap14: {
    gap: 14,
  },
});

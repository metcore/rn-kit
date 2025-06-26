import { StyleSheet, View } from 'react-native';

interface Timeline {
  children: React.ReactNode;
}

export default function Timeline({ children }: Timeline) {
  return <View style={styles.gap14}>{children}</View>;
}

const styles = StyleSheet.create({
  gap14: {
    gap: 14,
  },
});

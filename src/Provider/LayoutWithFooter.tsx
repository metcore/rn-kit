import { View, StyleSheet } from 'react-native';
import { useFooter } from './Provider';

export default function LayoutWithFooter({ children }) {
  const { footer } = useFooter();

  return (
    <View style={styles.container}>
      <View style={[styles.content, footer && { marginBottom: 60 }]}>
        {children}
      </View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});

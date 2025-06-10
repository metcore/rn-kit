import { View, StyleSheet } from 'react-native';
import { useFooter } from './Provider';
import React from 'react';

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const { footer } = useFooter();

  return (
    <View style={styles.container}>
      <View style={[styles.content, footer && styles.footer]}>{children}</View>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  footer: { marginBottom: 60 },
});

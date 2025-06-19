import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useFooter } from './Provider';
import React from 'react';
import Color from '../Color/Color';

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const { footer } = useFooter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, footer && styles.footer]}>{children}</View>
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.base.white100 },
  content: { flex: 1 },
  footer: { marginBottom: 60 },
});

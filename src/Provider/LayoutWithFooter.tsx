import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../Color/Color';
import { useFooter } from './Provider';

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
  container: { flex: 1, backgroundColor: Color.base.white100 },
  content: { flex: 1 },
  footer: { marginBottom: 60 },
});

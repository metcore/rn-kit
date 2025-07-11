// Footer.tsx
import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, type ViewStyle } from 'react-native';
import { useFooter } from '../Provider/Provider';
import Color from '../Color/Color';
import { useOptionalFocusEffect } from '../hooks/useOptionalFocusEffect';

interface FooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Footer: React.FC<FooterProps> = ({ children, style }) => {
  const { setFooter } = useFooter();

  const footerElement = useMemo(
    () => (
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    ),
    [children, style]
  );

  useOptionalFocusEffect(() => {
    setFooter(footerElement);
    return () => setFooter(null);
  });

  return null;
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.base.white100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

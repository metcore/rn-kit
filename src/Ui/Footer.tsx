import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import type { ViewStyle } from 'react-native';
import Color from '../Color/Color';
import { useFooter } from '../Provider/Provider';

interface FooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}
const Footer: React.FC<FooterProps> = ({ children, style }) => {
  const { setFooter } = useFooter();

  useEffect(() => {
    const footerElement = (
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    );
    setFooter(footerElement);

    return () => setFooter(null);
  }, [children, style, setFooter]);

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

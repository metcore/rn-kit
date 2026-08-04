import { Color, Container } from '@herca/rn-kit';
import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

interface DemoSurfaceProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * The framed box a demo sits in.
 *
 * Built on `Container` so the padding comes from the kit itself rather than
 * being restated here -- screens had taken to wrapping their content in a
 * second `Container` by hand to get that padding back.
 */
const DemoSurface: React.FC<DemoSurfaceProps> = ({ style, children }) => {
  return <Container style={[styles.surface, style]}>{children}</Container>;
};

export default DemoSurface;

const styles = StyleSheet.create({
  surface: {
    borderWidth: 1,
    borderColor: Color.gray[300],
    borderRadius: 16,
    overflow: 'hidden',
    gap: 12,
  },
});

import { StyleSheet } from 'react-native';
import Color from '../Color/Color';

export const border = {
  w: StyleSheet.create({
    0: { borderWidth: 0 },
    1: { borderWidth: 1 },
  }),
  bottom: StyleSheet.create({
    1: { borderBottomWidth: 1 },
  }),

  right: StyleSheet.create({
    1: { borderRightWidth: 1 },
  }),

  radius: StyleSheet.create({
    8: { borderRadius: 8 },
  }),

  color: {
    primary: StyleSheet.create({
      300: { borderColor: Color.primary[300] },
    }),
    danger: StyleSheet.create({
      300: { borderColor: Color.danger[300] },
    }),
  },
};

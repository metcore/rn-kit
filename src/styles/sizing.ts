import { StyleSheet } from 'react-native';

export const sizing = {
  w: StyleSheet.create({
    'full': { width: '100%' },
    '2/3': { width: '66.66%' },
    '3/4': { width: '75%' },
  }),
  h: StyleSheet.create({
    full: { height: '100%' },
  }),
};

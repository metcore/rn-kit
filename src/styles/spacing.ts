import { StyleSheet } from 'react-native';

export const spacing = {
  // padding
  p: StyleSheet.create({
    0: { padding: 0 },
    8: { padding: 8 },
    12: { padding: 12 },
  }),
  px: StyleSheet.create({
    0: { paddingHorizontal: 0 },
    4: { paddingHorizontal: 4 },
    8: { paddingHorizontal: 8 },
    12: { paddingHorizontal: 12 },
    24: { paddingHorizontal: 24 },
  }),
  py: StyleSheet.create({
    0: { paddingVertical: 0 },
    4: { paddingVertical: 4 },
    8: { paddingVertical: 8 },
    10: { paddingVertical: 10 },
    12: { paddingVertical: 12 },
    36: { paddingVertical: 36 },
  }),
  pt: StyleSheet.create({
    10: { paddingTop: 10 },
    12: { paddingTop: 12 },
    14: { paddingTop: 14 },
  }),
  pb: StyleSheet.create({
    0: { paddingBottom: 0 },
    8: { paddingBottom: 8 },
    12: { paddingBottom: 12 },
    14: { paddingBottom: 14 },
    24: { paddingBottom: 24 },
    32: { paddingBottom: 32 },
    46: { paddingBottom: 46 },
    215: { paddingBottom: 215 },
    262: { paddingBottom: 262 },
  }),
  pr: StyleSheet.create({
    25: { paddingRight: 25 },
  }),

  // margin
  mt: StyleSheet.create({
    12: { marginTop: 12 },
    4: { marginTop: 4 },
  }),
  mb: StyleSheet.create({
    10: { marginBottom: 10 },
    12: { marginBottom: 12 },
    20: { marginBottom: 20 },
    8: { marginBottom: 8 },
    4: { marginBottom: 4 },
  }),
  mr: StyleSheet.create({
    8: { marginRight: 8 },
    16: { marginRight: 16 },
    22: { marginRight: 22 },
  }),
  my: StyleSheet.create({
    12: { marginVertical: 12 },
  }),

  // gap
  gap: StyleSheet.create({
    16: { gap: 16 },
    12: { gap: 12 },
    10: { gap: 10 },
    8: { gap: 8 },
    6: { gap: 6 },
    4: { gap: 4 },
    2: { gap: 2 },
  }),
};

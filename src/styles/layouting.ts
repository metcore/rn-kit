import { StyleSheet } from 'react-native';

export const layouting = {
  flex: StyleSheet.create({
    1: { flex: 1 },
    grow: { flexGrow: 1 },
    shrink: { flexShrink: 1 },
    row: { flexDirection: 'row' },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    wrap: { flexWrap: 'wrap' },
    nowrap: { flexWrap: 'nowrap' },
  }),

  align: StyleSheet.create({
    center: { alignItems: 'center' },
    start: { alignItems: 'flex-start' },
    end: { alignItems: 'flex-end' },
  }),

  justify: StyleSheet.create({
    between: { justifyContent: 'space-between' },
    end: { justifyContent: 'flex-end' },
    center: { justifyContent: 'center' },
    start: { justifyContent: 'flex-start' },
  }),
  text: StyleSheet.create({
    verticalTop: { textAlignVertical: 'top' },
    left: { textAlign: 'left' },
    uppercase: { textTransform: 'uppercase' },
  }),
  display: StyleSheet.create({
    none: { display: 'none' },
  }),
};

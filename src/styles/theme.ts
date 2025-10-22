import { Color } from '@herca/rn-kit';
import { StyleSheet } from 'react-native';

export const theme = {
  chipFiltering: StyleSheet.create({
    chipsSelectWrapper: {
      flex: 1,
    },
    chipFilterContainer: {
      paddingLeft: 8,
      gap: 8,
    },
    chipsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    chipFilterSelectWrapper: {
      borderRightWidth: 1,
      paddingRight: 10,
      borderColor: Color.primary[200],
    },
  }),
  loadData: StyleSheet.create({
    loadMoreLoadingWrapper: {
      alignItems: 'center',
      paddingVertical: 10,
    },
  }),
  ticketCard: StyleSheet.create({
    ticketInfoWraper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    ticketFooter: {
      marginTop: 8,
    },
  }),
  btn: StyleSheet.create({
    iconBtn: {
      padding: 6,
      borderRadius: 8,
    },
  }),
};

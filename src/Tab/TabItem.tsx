import { View, StyleSheet } from 'react-native';
import type { TabItemProps } from './type';
import TabHeader from './TabHeader';

const TabItem = ({ isHeader }: TabItemProps) => {
  if (isHeader) {
    return <TabHeader />;
  }
  return <View style={styles.content}></View>;
};
const styles = StyleSheet.create({});
export default TabItem;

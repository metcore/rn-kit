import {
  Button,
  Color,
  Container,
  Icon,
  Tab,
  TabItem,
  Typography,
} from '@herca/rn-kit';
import LeaveApproveScreen from './example/Leave/LeaveApproveScreen';
import LeaveDetailScreen from './example/Leave/LeaveDetailScreen';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

export default function TabScreen() {
  const [tabItemHeight, setTabItemHeight] = useState(0);
  const [tabLeaveHeight, setTabLeaveHeight] = useState(0);

  return (
    <Container style={styles.container}>
      <Button title="tes" />
      <Tab
        onChangeTab={(number) => console.log('Change tab : ', number)}
        renderHeader={<Header />}
      >
        <TabItem name={'name1'} height={tabItemHeight}>
          <View
            onLayout={({ nativeEvent }) =>
              setTabItemHeight(nativeEvent.layout.height)
            }
          >
            <LeaveApproveScreen />
            <LeaveApproveScreen />
            <LeaveApproveScreen />
            <LeaveApproveScreen />
          </View>
        </TabItem>
        <TabItem name={'name1'} height={tabLeaveHeight}>
          <View
            onLayout={({ nativeEvent }) =>
              setTabLeaveHeight(nativeEvent.layout.height)
            }
          >
            <LeaveApproveScreen />
          </View>
        </TabItem>
        <TabItem
          renderTabName={({ isActive }) => (
            <View style={[styles.tabButton, isActive && styles.tabActive]}>
              <Icon
                name="info-circle-outline"
                size={19}
                color={isActive ? Color.base.white100 : Color.gray[700]}
              />
              <Typography
                center
                variant="t2"
                weight="semibold"
                color={isActive ? Color.base.white100 : Color.gray[700]}
              >
                {isActive ? 'Wow it works!' : 'Click Me!'}
              </Typography>
            </View>
          )}
        >
          <LeaveDetailScreen />
        </TabItem>
      </Tab>
    </Container>
  );
}

const Header = () => {
  return <View style={styles.header} />;
};

const styles = StyleSheet.create({
  header: { height: 200, backgroundColor: 'black' },
  container: { flex: 1, gap: 5 },
  tabButton: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    flexDirection: 'row',
    gap: 4,
  },
  tabActive: {
    backgroundColor: Color.primary[1000],
    borderRadius: 8,
  },
});

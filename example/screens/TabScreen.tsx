import { Button, Container, Tab, TabItem } from '@herca/rn-kit';
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
        <TabItem name={'name1'}>
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
});

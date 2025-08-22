import { Button, Container, Tab, TabItem } from '@herca/rn-kit';
import LeaveApproveScreen from './example/Leave/LeaveApproveScreen';
import LeaveDetailScreen from './example/Leave/LeaveDetailScreen';
import { View } from 'react-native';

export default function TabScreen() {
  const Header = () => {
    return <View style={{ height: 200, backgroundColor: 'black' }}></View>;
  };

  return (
    <Container style={{ flex: 1, gap: 5 }}>
      <Button title="tes" />
      <Tab
        onChangeTab={(number) => console.log('Change tab : ', number)}
        renderHeader={<Header />}
      >
        <TabItem name={'name1'}>
          <LeaveApproveScreen />
        </TabItem>
        <TabItem name={'name1'}>
          <LeaveApproveScreen />
        </TabItem>
        <TabItem name={'name1'}>
          <LeaveDetailScreen />
        </TabItem>
      </Tab>
    </Container>
  );
}

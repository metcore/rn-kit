import { Container, Tab, TabItem } from '@herca/rn-kit';
import LeaveApproveScreen from './example/Leave/LeaveApproveScreen';
import LeaveDetailScreen from './example/Leave/LeaveDetailScreen';

export default function TabScreen() {
  return (
    <Container style={{ flex: 1 }}>
      <Tab onChangeTab={(number) => console.log('Change tab : ', number)}>
        <TabItem name={'name1'}>
          <LeaveDetailScreen />
        </TabItem>
        <TabItem name={'name2'}>
          <LeaveApproveScreen />
        </TabItem>
        <TabItem name={'children'}>
          <LeaveApproveScreen />
        </TabItem>
      </Tab>
    </Container>
  );
}

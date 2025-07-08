import { Container, Tab, TabItem } from '@herca/rn-kit';
import LeaveApproveScreen from './example/Leave/LeaveApproveScreen';
import LeaveDetailScreen from './example/Leave/LeaveDetailScreen';

export default function TabScreen() {
  return (
    <Container style={{ flex: 1 }}>
      <Tab onChangeTab={(number) => console.log('Change tab : ', number)}>
        <TabItem name={'name1'} component={LeaveApproveScreen} />
        <TabItem name={'name2'} component={LeaveDetailScreen} />
        <TabItem name={'name'} component={LeaveApproveScreen} />
        <TabItem name={'name'} component={LeaveApproveScreen} />
      </Tab>
    </Container>
  );
}

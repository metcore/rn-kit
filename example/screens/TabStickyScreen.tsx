import { Container, Tab, TabItem, Typography } from '@herca/rn-kit';
import LeaveApproveScreen from './example/Leave/LeaveApproveScreen';
import LeaveDetailScreen from './example/Leave/LeaveDetailScreen';
import { ScrollView, View } from 'react-native';

export default function TabStickyScreen() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
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
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
        <View>
          <Typography>tes</Typography>
        </View>
      </ScrollView>
    </Container>
  );
}

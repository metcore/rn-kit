import { Button, Container, Tab, TabItem, Typography } from '@herca/rn-kit';
import LeaveApproveScreen from './example/Leave/LeaveApproveScreen';
import LeaveDetailScreen from './example/Leave/LeaveDetailScreen';
import { Animated } from 'react-native';
import { useRef } from 'react';

export default function TabDefaultScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <Container style={{ flex: 1 }}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Konten luar */}
        <Button>
          <Typography>Tes nama headernnya Tes nama headernnya</Typography>
        </Button>

        {/* Tab */}
        <Tab
          current={0}
          scrollY={scrollY}
          onChangeTab={(number) => console.log('Change tab : ', number)}
        >
          <TabItem name="name1">
            <LeaveDetailScreen />
          </TabItem>
          <TabItem name="name2231 12">
            <LeaveApproveScreen />
          </TabItem>
          <TabItem name="children">
            <LeaveApproveScreen />
          </TabItem>
          <TabItem name="name3">
            <LeaveDetailScreen />
          </TabItem>
          <TabItem name="name5">
            <LeaveDetailScreen />
          </TabItem>
        </Tab>
      </Animated.ScrollView>
    </Container>
  );
}

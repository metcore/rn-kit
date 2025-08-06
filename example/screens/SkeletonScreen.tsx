import { Card, Container } from '@herca/rn-kit';
import Skeleton from '../../src/Skeleton/Skeleton';
import { StyleSheet, View } from 'react-native';

export default function SkeletonScreen() {
  return (
    <Container style={styles.gap10}>
      <Card style={styles.gap10}>
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={20} rounded={5} />
          <Skeleton width={'20%'} height={20} rounded={5} />
        </View>
        <Skeleton width={'100%'} height={50} rounded={5} />
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={30} rounded={5} />
          <Skeleton width={'40%'} height={30} rounded={5} />
        </View>
      </Card>
      <Card style={styles.gap10}>
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={20} rounded={5} />
          <Skeleton width={'20%'} height={20} rounded={5} />
        </View>
        <Skeleton width={'100%'} height={50} rounded={5} />
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={30} rounded={5} />
          <Skeleton width={'40%'} height={30} rounded={5} />
        </View>
      </Card>
      <Card style={styles.gap10}>
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={20} rounded={5} />
          <Skeleton width={'20%'} height={20} rounded={5} />
        </View>
        <Skeleton width={'100%'} height={50} rounded={5} />
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={30} rounded={5} />
          <Skeleton width={'40%'} height={30} rounded={5} />
        </View>
      </Card>
      <Card style={styles.gap10}>
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={20} rounded={5} />
          <Skeleton width={'20%'} height={20} rounded={5} />
        </View>
        <Skeleton width={'100%'} height={50} rounded={5} />
        <View style={styles.skeletonItem}>
          <Skeleton width={'40%'} height={30} rounded={5} />
          <Skeleton width={'40%'} height={30} rounded={5} />
        </View>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({
  skeletonItem: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  gap10: {
    gap: 10,
  },
});

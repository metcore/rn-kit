import { BadgeIcon, Container, Typography } from '@herca/rn-kit';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function BadgeIconScreen() {
  return (
    <ScrollView>
      <Container style={styles.gap10}>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" size="small" />
          <BadgeIcon icon="Box" />
          <BadgeIcon icon="Box" size="large" />
          <Typography variant="t2">: Default Color</Typography>
        </View>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" color="primary" size="small" />
          <BadgeIcon icon="Box" color="primary" />
          <BadgeIcon icon="Box" color="primary" size="large" />
          <Typography variant="t2">: Primary Color</Typography>
        </View>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" color="info" size="small" />
          <BadgeIcon icon="Box" color="info" />
          <BadgeIcon icon="Box" color="info" size="large" />
          <Typography variant="t2">: Info Color</Typography>
        </View>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" color="orange" size="small" />
          <BadgeIcon icon="Box" color="orange" />
          <BadgeIcon icon="Box" color="orange" size="large" />
          <Typography variant="t2">: Orange Color</Typography>
        </View>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" color="success" size="small" />
          <BadgeIcon icon="Box" color="success" />
          <BadgeIcon icon="Box" color="success" size="large" />
          <Typography variant="t2">: Success Color</Typography>
        </View>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" color="danger" size="small" />
          <BadgeIcon icon="Box" color="danger" />
          <BadgeIcon icon="Box" color="danger" size="large" />
          <Typography variant="t2">: Danger Color</Typography>
        </View>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" color="warning" size="small" />
          <BadgeIcon icon="Box" color="warning" />
          <BadgeIcon icon="Box" color="warning" size="large" />
          <Typography variant="t2">: Warning Color</Typography>
        </View>
        <View style={styles.sizeWrapper}>
          <BadgeIcon icon="Box" color="#fa2fad" size="small" />
          <BadgeIcon icon="Box" color="#fa2fad" />
          <BadgeIcon icon="Box" color="#fa2fad" size="large" />
          <Typography variant="t2">: Custom Color</Typography>
        </View>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sizeWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  gap10: {
    gap: 10,
  },
});

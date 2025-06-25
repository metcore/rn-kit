import { Image, StyleSheet, View } from 'react-native';
import { Button, Color, Container, Modal, Typography } from '..';
import type { RequiredUpdateAppsProviderProps } from './type';
import { useEffect } from 'react';

export default function RequiredUpdateAppsProvider({
  title,
  description,
  buttonText = 'Update Sekarang',
  onUpdate,
}: RequiredUpdateAppsProviderProps) {
  useEffect(() => {
    onUpdate?.(false);
  }, [onUpdate]);
  return (
    <View>
      <Modal height={300} isOpen={true} closable={false}>
        <Image
          source={require('../_assets/updateapps.png')}
          style={styles.image}
        />
        <Container style={styles.container}>
          <Typography
            variant="h4"
            weight="semibold"
            color={Color.gray[800]}
            center
          >
            {title}
          </Typography>
          <Typography
            variant="t1"
            weight="regular"
            color={Color.gray[600]}
            center
          >
            {description}.
          </Typography>
          <View style={{}}>
            <Button title={buttonText} color="primary" />
          </View>
        </Container>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    marginTop: -60,
    left: 30,
  },
  container: {
    gap: 20,
    marginTop: 80,
  },
});

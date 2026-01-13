import { useEffect } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Button, Card, Color, Modal, Typography } from '..';
import type { RequiredUpdateAppsProviderProps } from './type';

export default function RequiredUpdateAppsProvider({
  title,
  description,
  buttonText = 'Update Sekarang',
  onUpdate,
  fillScreen = false,
}: RequiredUpdateAppsProviderProps) {
  useEffect(() => {
    onUpdate?.(false);
  }, [onUpdate]);
  return (
    <Modal
      isOpen={true}
      closable={false}
      modalStyle={fillScreen ? styles.modalFill : undefined}
    >
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../_assets/updateapps.png')}
          style={styles.image}
        />
      </View>
      <Card style={styles.container} borderColor="transparent">
        <View style={styles.content}>
          <Typography
            variant="p1"
            weight="semibold"
            color={Color.gray[900]}
            center
          >
            {title}
          </Typography>
          <Typography variant="t2" color={Color.gray[700]} center>
            {description}
          </Typography>
        </View>

        <View>
          <Button
            title={buttonText}
            color="primary"
            onPress={() => {
              onUpdate?.(false);
            }}
          />
        </View>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: Platform.OS === 'ios' ? -60 : -75,
    objectFit: 'contain',
    height: 124,
  },
  container: {
    gap: 20,
    padding: Platform.OS === 'ios' ? 24 : 10,
  },
  content: {
    gap: 10,
  },
  modalFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    maxHeight: 'auto',
    justifyContent: 'center',
  },
});

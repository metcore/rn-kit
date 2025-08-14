import { Container, Icon, Typography } from '@herca/rn-kit';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { IconNameProps } from '../../src/Icon';

const icons: IconNameProps[] = [
  'AirPlane',
  'ArrowBackAlt',
  'ArrowDown',
  'ArrowForwardAlt',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'Calendar',
  'Camera',
  'Check',
  'Document',
  'Download',
  'ExclamationMark',
  'Eye',
  'EyeOpen',
  'Filter',
  'Image',
  'Pdf',
  'RadioButton',
  'Search',
  'StickyNote',
  'Times',
  'User',
  'x-circle',
  'Plus',
  'Bell',
  'file-list-check',
  'file-text',
  'bookmark-user',
  'folder-clock',
  'home-fill',
  'home-outline',
  'user-circle-outline',
  'user-circle-fill',
  'clipboard-list-check',
  'clipboard-list',
  'Megaphone',
  'clipboard-list-check-outline',
  'Scanner',
  'Clock',
  'clock-outline',
  'box-outline',
  'Box',
  'Minus',
  'plus-square',
  'at-sign',
  'briefcase-outline',
  'edit-square-outline',
  'globe-earth',
  'lock-fill',
  'logo-herca-hris',
  'question-circle-outline',
  'shield-fill',
  'Users',
  'whatsapp-fill',
  'Bold',
  'UnderLine',
  'Italic',
  'settings-slider',
  'rotate-square-fill',
  'discount-fill',
  'location-pin-fill',
  'copy-fill',
  'copy-text-fill',
  'shield-checked-fill',
];

export default function IconScreen() {
  return (
    <ScrollView>
      <Container style={styles.container}>
        {icons.map((name) => (
          <View key={name} style={styles.wrapper}>
            <Icon name={name as IconNameProps} size={30} />
            <Typography variant="p3" weight="semibold" style={styles.title}>
              {name}
            </Typography>
          </View>
        ))}
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  title: {
    textAlign: 'center',
  },
});

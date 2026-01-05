import { Container, Icon, Input, Typography } from '@herca/rn-kit';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { IconNameProps } from '../../src/Icon';
import { useState } from 'react';

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
  'Bolt',
  'bolt-slash',
  'image-plus',
  'Signature',
  'info-circle-fill',
  'Trash',
  'time-forward',
  'Money',
  'Flag',
  'Coupon',
  'more-vertical',
  'rotate-right',
  'exclamation-triangle',
  'pdf-file',
  'clipboard-list-check-fill-2',
  'arrow-up-circle-fill',
  'Envelope',
  'Phone',
  'money-down',
  'car-outline',
  'location-pin-outline',
  'briefcase-fill-bulk',
  'stopwatch-fill',
  'times-new',
  'credit-card',
  'user-circle-money-up',
  'FaceId',
  'Building',
  'user-tag-fill',
  'Cake',
  'briefcase-fill',
  'warning-letter',
  'document-list',
  'document-list-pay',
  'user-clock',
  'Receipt',
  'Pencil',
  'setting-gear',
  'calendar-check',
  'calendar-close',
  'file-list-plus',
  'Login',
  'Logout',
  'credit-card-fill',
  'file-list-plus-outline',
  'grid-fill-bulk',
  'hourglass-fill-bulk',
  'money-up-fill-bulk',
  'plane-fill-bulk',
  'rotate-card-fill-bulk',
  'stopwatch-check-fill',
  'stopwatch-check-outline',
  'user-check-fill-bulk',
];

export default function IconScreen() {
  const [query, setQuery] = useState<string>('');

  return (
    <ScrollView>
      <Container>
        <Input
          placeholder="Search ..."
          icon="Search"
          onChangeText={(val) => setQuery(val)}
        />
      </Container>
      <Container style={styles.container}>
        {icons
          .filter((name) => name.includes(query))
          .map((name) => (
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

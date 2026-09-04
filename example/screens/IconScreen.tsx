import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Color,
  Icon,
  Input,
  Typography,
  type IconNameProps,
} from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoRow,
} from '../components/demo';

const ICON_NAMES: IconNameProps[] = [
  'Search',
  'User',
  'Eye',
  'EyeOpen',
  'ArrowRight',
  'ArrowLeft',
  'Document',
  'Calendar',
  'ExclamationMark',
  'Download',
  'x-circle',
  'StickyNote',
  'RadioButton',
  'Pdf',
  'ArrowBackAlt',
  'ArrowForwardAlt',
  'Check',
  'Filter',
  'AirPlane',
  'Camera',
  'Image',
  'Times',
  'ArrowDown',
  'ArrowUp',
  'Plus',
  'Minus',
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
  'Scanner',
  'clock-outline',
  'Clock',
  'box-outline',
  'clipboard-list-check-outline',
  'Box',
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
  'Italic',
  'UnderLine',
  'settings-slider',
  'rotate-square-fill',
  'location-pin-fill',
  'discount-fill',
  'copy-fill',
  'copy-text-fill',
  'shield-checked-fill',
  'calendar-edit',
  'info-circle-outline',
  'user-edit',
  'Tag',
  'Tool',
  'Bolt',
  'bolt-slash',
  'image-plus',
  'Trash',
  'time-forward',
  'Signature',
  'Money',
  'info-circle-fill',
  'Flag',
  'Coupon',
  'more-vertical',
  'exclamation-triangle',
  'pdf-file',
  'rotate-right',
  'arrow-up-circle-fill',
  'clipboard-list-check-fill-2',
  'Phone',
  'Envelope',
  'align-center',
  'align-left',
  'align-right',
  'strike-through',
  'Link',
  'list-ordered',
  'list-un-ordered',
  'briefcase-fill-bulk',
  'location-pin-outline',
  'car-outline',
  'money-down',
  'comment-fill',
  'share-up',
  'stopwatch-fill',
  'times-new',
  'user-circle-money-up',
  'credit-card',
  'FaceId',
  'briefcase-fill',
  'user-tag-fill',
  'Cake',
  'Building',
  'warning-letter',
  'document-list',
  'document-list-pay',
  'user-clock',
  'Receipt',
  'setting-gear',
  'Pencil',
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
  'stopwatch-fill-2',
  'arrow-right-long',
  'hourglass-fill',
  'user-square',
  'users-slash',
  'Sun',
  'paper-board-check',
  'user-change',
  'calendar-plus',
  'calendar-clock',
  'sort-vertical',
  'bar-code',
  'cube-scan',
  'devices',
  'user-square-outline',
  'box-search-outline',
  'hierarchy-3',
  'global',
  'scan-qr',
  'calendar-clock-triangle-exclamation',
  'package',
  'sticky-note-text-square',
  'triangle-exclamation-time',
  'user-edit-triangle-exclamation',
  'bookmark',
  'calendar-clock-fill-bulk',
  'clock-square-fill',
  'file-list-plus-fill-bulk',
  'fuel-fill',
  'package-tool-fill',
  'payslip-fill',
  'stopwatch-check-fill-bulk',
  'user-clock-fill-bulk',
  'play-fill',
  'users-fill-bulk',
  'ban-outline',
  'file-list-star-fill',
  'text-fill',
  'exchange-horizontal',
];

const SIZES = [16, 24, 40] as const;

const COLORS = [
  { label: 'primary[1000]', value: Color.primary[1000] },
  { label: 'danger[500]', value: Color.danger[500] },
  { label: 'gray[600]', value: Color.gray[600] },
] as const;

export default function IconScreen() {
  const [query, setQuery] = useState('');

  const filteredNames = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return ICON_NAMES;
    }
    return ICON_NAMES.filter((name) => name.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <DemoScreen
      title="Icons"
      description={`Kumpulan ${ICON_NAMES.length} ikon SVG siap pakai dengan ukuran dan warna yang bisa diatur lewat prop.`}
    >
      <DemoSection
        title="Ukuran"
        note="size mengatur ukuran ikon dalam piksel."
      >
        <DemoRow>
          {SIZES.map((size) => (
            <View key={size} style={styles.item}>
              <Icon name="Calendar" size={size} color={Color.gray[900]} />
              <DemoLabel text={`size={${size}}`} />
            </View>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Warna"
        note="color menerima nilai warna string apa pun, biasanya diambil dari token Color."
      >
        <DemoRow>
          {COLORS.map(({ label, value }) => (
            <View key={label} style={styles.item}>
              <Icon name="Bell" size={28} color={value} />
              <DemoLabel text={`color={Color.${label}}`} />
            </View>
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Cari semua ikon"
        note={`Ketik nama untuk memfilter ${ICON_NAMES.length} nama yang tersedia di prop name.`}
      >
        <Input
          placeholder="Cari ikon..."
          icon="Search"
          value={query}
          onChangeText={setQuery}
          clearButton
        />
        <View style={styles.grid}>
          {filteredNames.map((name) => (
            <View key={name} style={styles.tile}>
              <View style={styles.tileIconBox}>
                <Icon name={name} size={24} color={Color.primary[1000]} />
              </View>
              <Typography
                variant="t3"
                color={Color.gray[700]}
                style={styles.tileLabel}
                numberOfLines={2}
              >
                {name}
              </Typography>
            </View>
          ))}
        </View>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    gap: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
  },
  tile: {
    width: '25%',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  tileIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Color.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    textAlign: 'center',
  },
});

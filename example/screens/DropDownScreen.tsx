import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color, DropDown, Icon, Typography } from '@herca/rn-kit';
import type { ChipOptionProps, IconNameProps } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const MENU_OPTIONS: ChipOptionProps[] = [
  { label: 'Bagikan', value: 'share' },
  { label: 'Ubah', value: 'edit' },
  { label: 'Hapus', value: 'delete' },
];

const ICON_OPTIONS: ChipOptionProps[] = [
  { label: 'Bagikan', value: 'share', icon: 'share-up' },
  { label: 'Ubah', value: 'edit', icon: 'edit-square-outline' },
  { label: 'Hapus', value: 'delete', icon: 'Trash' },
];

export default function DropDownScreen() {
  const [selected, setSelected] = useState<string | number | null>(null);

  return (
    <DemoScreen
      title="Drop Down"
      description="Menu pilihan yang muncul di atas modal transparan, diposisikan otomatis relatif terhadap tombol pemicu."
    >
      <DemoSection
        title="Menu dasar"
        note="renderButton menampilkan elemen pemicu; onSelect dipanggil dengan value opsi yang dipilih."
      >
        <DropDown
          options={MENU_OPTIONS}
          onSelect={(val) => setSelected(val)}
          renderButton={<Icon name="more-vertical" />}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Dipilih: ${selected ?? '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Trigger kustom"
        note="renderButton bebas diisi elemen apa pun, misalnya tombol berlabel dengan border."
      >
        <DemoLabel text="renderButton={<View>...</View>}" />
        <DropDown
          options={MENU_OPTIONS}
          onSelect={(val) => setSelected(val)}
          renderButton={
            <View style={styles.customTrigger}>
              <Typography variant="t2" weight="medium" color={Color.gray[800]}>
                Aksi lain
              </Typography>
            </View>
          }
        />
      </DemoSection>

      <DemoSection
        title="Item kustom"
        note="renderItem mengganti tampilan tiap opsi, misalnya menambahkan ikon di samping label."
      >
        <DropDown
          options={ICON_OPTIONS}
          width={180}
          onSelect={(val) => setSelected(val)}
          renderButton={<Icon name="more-vertical" />}
          renderItem={(item) => (
            <View style={styles.itemRow}>
              <Icon
                name={item.icon as IconNameProps}
                size={18}
                color={Color.gray[700]}
              />
              <Typography variant="t2" color={Color.gray[800]}>
                {item.label}
              </Typography>
            </View>
          )}
        />
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  customTrigger: {
    borderWidth: 1,
    borderColor: Color.gray[300],
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

import { StyleSheet, View } from 'react-native';
import { Color, Icon, Label, Typography } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoRow,
} from '../components/demo';

const COLORS = [
  'default',
  'success',
  'danger',
  'primary',
  'warning',
  'info',
  'purple',
  'orange',
] as const;

export default function LabelScreen() {
  return (
    <DemoScreen
      title="Label"
      description="Label adalah badge kecil untuk menampilkan status, kategori, atau metadata ringkas."
    >
      <DemoSection
        title="Varian warna"
        note="Prop color menentukan 8 kombinasi warna background dan teks yang tersedia."
        row
      >
        {COLORS.map((color) => (
          <View key={color}>
            <DemoLabel text={`color="${color}"`} />
            <Label label={color} color={color} />
          </View>
        ))}
      </DemoSection>

      <DemoSection
        title="Dengan icon"
        note="Prop icon menampilkan ikon di sebelah kiri teks label."
        row
      >
        <Label label="Terjadwal" color="info" icon="Calendar" />
        <Label label="Ditolak" color="danger" icon="x-circle" />
      </DemoSection>

      <DemoSection
        title="Panjang teks beragam"
        note="Label mengikuti lebar teks (alignSelf: flex-start) sehingga cocok untuk teks pendek maupun panjang."
      >
        <Label label="Aktif" color="success" />
        <Label label="Menunggu persetujuan" color="warning" />
        <Label label="Pengajuan cuti tahunan sedang diproses" color="primary" />
      </DemoSection>

      <DemoSection
        title="Konten kustom"
        note="Prop children menggantikan label & icon bawaan dengan isi bebas."
      >
        <DemoLabel
          text={'<Label color="purple"><Icon /><Typography /></Label>'}
        />
        <Label color="purple">
          <DemoRow style={styles.customRow}>
            <Icon name="Check" color={Color.purple[300]} size={12} />
            <Typography variant="t2" color={Color.purple[300]}>
              Custom
            </Typography>
          </DemoRow>
        </Label>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  customRow: {
    gap: 4,
  },
});

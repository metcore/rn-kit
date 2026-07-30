import { StyleSheet, View } from 'react-native';
import { Alert } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const COLORS = [
  'default',
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'orange',
  'purple',
] as const;

export default function AlertScreen() {
  return (
    <DemoScreen
      title="Alert"
      description="Kotak pesan berwarna dengan ikon, judul opsional, dan pesan, cocok untuk status keberhasilan, peringatan, atau info."
    >
      <DemoSection
        title="Varian warna"
        note="color memilih tema warna latar, border, ikon, dan teks alert."
      >
        {COLORS.map((color) => (
          <View key={color} style={styles.item}>
            <DemoLabel text={`color="${color}"`} />
            <Alert
              title="Status"
              message="Ini pesan contoh untuk alert."
              color={color}
            />
          </View>
        ))}
      </DemoSection>

      <DemoSection
        title="Dengan & tanpa judul"
        note="title bersifat opsional; tanpa title, alert hanya menampilkan pesan."
      >
        <DemoLabel text="title + message" />
        <Alert
          title="Berhasil disimpan"
          message="Data karyawan telah diperbarui."
          color="success"
        />
        <DemoLabel text="message saja (tanpa title)" />
        <Alert message="Perubahan otomatis tersimpan." color="info" />
      </DemoSection>

      <DemoSection
        title="Ikon kustom"
        note='icon mengganti ikon bawaan ("ExclamationMark") dengan ikon lain dari koleksi Icon.'
      >
        <DemoLabel text='icon="Check"' />
        <Alert
          icon="Check"
          title="Terverifikasi"
          message="Dokumen sudah lolos pemeriksaan."
          color="success"
        />
        <DemoLabel text='icon="Bell"' />
        <Alert
          icon="Bell"
          title="Pengingat"
          message="Jangan lupa mengisi absensi hari ini."
          color="warning"
        />
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  item: {
    gap: 4,
  },
});

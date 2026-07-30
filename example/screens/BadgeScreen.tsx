import { View } from 'react-native';
import { Badge } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoRow,
  DemoLabel,
} from '../components/demo';

const COLORS = [
  'default',
  'primary',
  'success',
  'info',
  'danger',
  'warning',
  'orange',
  'purple',
] as const;

export default function BadgeScreen() {
  return (
    <DemoScreen
      title="Badge"
      description="Label kecil untuk menampilkan status atau informasi tambahan, tersedia dalam varian warna, ukuran, dan mode dot."
    >
      <DemoSection
        title="Varian warna"
        note="Prop color memilih tema warna latar dan teks badge; bisa juga diisi kode hex kustom."
      >
        <DemoRow>
          {COLORS.map((color) => (
            <Badge key={color} color={color} value={color} />
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Ukuran"
        note="Prop size hanya mendukung dua nilai: small dan medium."
      >
        <DemoRow>
          <View>
            <DemoLabel text='size="small"' />
            <Badge color="primary" size="small" value="Kecil" />
          </View>
          <View>
            <DemoLabel text='size="medium"' />
            <Badge color="primary" size="medium" value="Sedang" />
          </View>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Mode dot"
        note="dot menampilkan titik status kecil tanpa teks, cocok untuk indikator online/status singkat."
      >
        <DemoLabel text="dot" />
        <DemoRow>
          {COLORS.map((color) => (
            <Badge key={color} color={color} dot />
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Warna kustom (hex)"
        note="Mengisi color dengan kode hex membuat badge memakai latar transparan dari warna tersebut."
      >
        <DemoLabel text='color="#219294"' />
        <Badge color="#219294" value="Warna kustom" />
      </DemoSection>
    </DemoScreen>
  );
}

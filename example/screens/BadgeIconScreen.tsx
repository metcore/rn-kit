import { View } from 'react-native';
import { Color, Typography, BadgeIcon } from '@herca/rn-kit';
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

const formatCount = (count: number, max = 9) =>
  count > max ? `${max}+` : String(count);

export default function BadgeIconScreen() {
  return (
    <DemoScreen
      title="Badge Icon"
      description="Badge berbentuk kotak untuk menampilkan ikon atau konten kustom, tersedia dalam varian warna dan ukuran."
    >
      <DemoSection
        title="Ikon & warna"
        note="icon menampilkan ikon di tengah badge; color memilih tema warna latar dan ikon."
      >
        <DemoRow>
          {COLORS.map((color) => (
            <BadgeIcon key={color} icon="Box" color={color} />
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Ukuran"
        note="size mendukung tiga nilai: small, medium, dan large."
      >
        <DemoRow>
          <View>
            <DemoLabel text='size="small"' />
            <BadgeIcon icon="Bell" color="primary" size="small" />
          </View>
          <View>
            <DemoLabel text='size="medium"' />
            <BadgeIcon icon="Bell" color="primary" size="medium" />
          </View>
          <View>
            <DemoLabel text='size="large"' />
            <BadgeIcon icon="Bell" color="primary" size="large" />
          </View>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Konten kustom (children)"
        note="BadgeIcon tidak punya mode dot atau count bawaan; children menggantikan icon sepenuhnya, jadi angka notifikasi disusun manual seperti contoh ini."
      >
        <DemoLabel text="children" />
        <DemoRow>
          <BadgeIcon color="danger" size="small">
            <Typography
              variant="t3"
              weight="semibold"
              color={Color.danger[600]}
            >
              {formatCount(3)}
            </Typography>
          </BadgeIcon>
          <BadgeIcon color="danger" size="small">
            <Typography
              variant="t3"
              weight="semibold"
              color={Color.danger[600]}
            >
              {formatCount(24)}
            </Typography>
          </BadgeIcon>
        </DemoRow>
      </DemoSection>
    </DemoScreen>
  );
}

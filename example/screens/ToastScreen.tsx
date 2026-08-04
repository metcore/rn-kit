import { useState } from 'react';
import {
  Button,
  Color,
  Typography,
  useToast,
  type ColorVariantType,
} from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoRow,
  DemoLabel,
} from '../components/demo';

const COLORS: ColorVariantType[] = [
  'default',
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'orange',
  'purple',
];

export default function ToastScreen() {
  const toast = useToast();
  const [lastTriggered, setLastTriggered] = useState('-');

  const trigger = (color: ColorVariantType, duration?: number) => {
    toast.show(`Toast warna ${color}`, { color, duration });
    setLastTriggered(
      `color="${color}"${duration ? ` duration={${duration}}` : ''}`
    );
  };

  return (
    <DemoScreen
      title="Toast"
      description="Notifikasi sekilas yang dipicu secara imperatif lewat hook useToast, tampil di bagian bawah layar lalu hilang otomatis."
    >
      <DemoSection
        title="Varian warna"
        note="Opsi color pada toast.show(message, options) memilih tema warna toast."
      >
        <DemoRow>
          {COLORS.map((color) => (
            <Button
              key={color}
              title={color}
              size="small"
              variant="outline"
              color="primary"
              onPress={() => trigger(color)}
            />
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Durasi tampil"
        note="Opsi duration (ms) mengatur berapa lama toast tampil sebelum hilang; default 3000ms."
      >
        <DemoLabel text="duration={1000}" />
        <DemoLabel text="duration={6000}" />
        <DemoRow>
          <Button
            title="Cepat"
            size="small"
            onPress={() => trigger('info', 1000)}
          />
          <Button
            title="Lama"
            size="small"
            onPress={() => trigger('info', 6000)}
          />
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Konten kustom"
        note="Opsi children menyisipkan elemen tambahan, misal tombol aksi, di sisi kanan toast."
      >
        <DemoLabel text="children" />
        <Button
          title="Toast dengan tombol aksi"
          onPress={() =>
            toast.show('Berkas berhasil diunggah', {
              color: 'success',
              children: (
                <Button
                  title="Lihat"
                  size="small"
                  variant="outline"
                  color="primary"
                  onPress={() => setLastTriggered('tombol aksi "Lihat"')}
                />
              ),
            })
          }
        />
      </DemoSection>

      <DemoSection
        title="Status pemicu"
        note="Readout ini menampilkan opsi toast terakhir yang dipicu dari tombol di atas."
      >
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terakhir dipicu: ${lastTriggered}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

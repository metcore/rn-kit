import { useState } from 'react';
import { Button, Color, Typography, YearPicker } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function YearPickerScreen() {
  const [openSingle, setOpenSingle] = useState(false);
  const [single, setSingle] = useState<number[]>([]);

  const [openMultiple, setOpenMultiple] = useState(false);
  const [multiple, setMultiple] = useState<number[]>([]);

  const [openRange, setOpenRange] = useState(false);
  const [range, setRange] = useState<{
    startDate: number | null;
    endDate: number | null;
  }>({ startDate: null, endDate: null });

  return (
    <DemoScreen
      title="Year Picker"
      description="Pemilih tahun di dalam BottomSheet dengan navigasi halaman ±60 tahun, dibuka lewat tombol pemicu dan dikonfirmasi lewat tombol Pilih."
    >
      <DemoSection
        title="Pilihan tunggal"
        note="mode single mengirim array berisi satu tahun lewat onChange saat Pilih ditekan."
      >
        <DemoLabel text='mode="single"' />
        <Button
          title="Buka Year Picker Tunggal"
          color="primary"
          onPress={() => setOpenSingle(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${single[0] ?? '-'}`}
        </Typography>
        <YearPicker
          isOpen={openSingle}
          mode="single"
          onClose={() => setOpenSingle(false)}
          onChange={(value) => setSingle(value as number[])}
        />
      </DemoSection>

      <DemoSection
        title="Pilihan beberapa tahun"
        note="mode multiple men-toggle tiap tahun yang ditekan dan mengirim array daftar tahun terpilih."
      >
        <DemoLabel text='mode="multiple"' />
        <Button
          title="Buka Year Picker Multiple"
          color="primary"
          onPress={() => setOpenMultiple(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${multiple.length ? multiple.join(', ') : '-'}`}
        </Typography>
        <YearPicker
          isOpen={openMultiple}
          mode="multiple"
          onClose={() => setOpenMultiple(false)}
          onChange={(value) => setMultiple(value as number[])}
        />
      </DemoSection>

      <DemoSection
        title="Rentang tahun"
        note="mode range mengirim objek startDate & endDate, otomatis menukar urutan jika tahun kedua lebih kecil."
      >
        <DemoLabel text='mode="range"' />
        <Button
          title="Buka Year Picker Rentang"
          color="primary"
          onPress={() => setOpenRange(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${range.startDate ?? '-'} s/d ${range.endDate ?? '-'}`}
        </Typography>
        <YearPicker
          isOpen={openRange}
          mode="range"
          onClose={() => setOpenRange(false)}
          onChange={(value) =>
            setRange(
              value as { startDate: number | null; endDate: number | null }
            )
          }
        />
      </DemoSection>
    </DemoScreen>
  );
}

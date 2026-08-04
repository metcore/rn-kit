import { useState } from 'react';
import { Button, Color, MonthPicker, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export default function MonthPickerScreen() {
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
      title="Month Picker"
      description="Pemilih bulan di dalam BottomSheet, dibuka lewat tombol pemicu dan hasilnya baru terkirim saat tombol Pilih ditekan."
    >
      <DemoSection
        title="Pilihan tunggal"
        note="mode single mengirim array berisi satu bulan lewat onChange saat Pilih ditekan."
      >
        <DemoLabel text='mode="single"' />
        <Button
          title="Buka Month Picker"
          color="primary"
          onPress={() => setOpenSingle(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${single[0] !== undefined ? MONTH_NAMES[single[0]] : '-'}`}
        </Typography>
        <MonthPicker
          isOpen={openSingle}
          mode="single"
          onClose={() => setOpenSingle(false)}
          onChange={(value) => setSingle(value as number[])}
        />
      </DemoSection>

      <DemoSection
        title="Pilihan beberapa bulan"
        note="mode multiple men-toggle tiap bulan yang ditekan dan mengirim array daftar bulan terpilih."
      >
        <DemoLabel text='mode="multiple"' />
        <Button
          title="Buka Month Picker Multiple"
          color="primary"
          onPress={() => setOpenMultiple(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${multiple.length ? multiple.map((m) => MONTH_NAMES[m]).join(', ') : '-'}`}
        </Typography>
        <MonthPicker
          isOpen={openMultiple}
          mode="multiple"
          onClose={() => setOpenMultiple(false)}
          onChange={(value) => setMultiple(value as number[])}
        />
      </DemoSection>

      <DemoSection
        title="Rentang bulan"
        note="mode range mengirim objek startDate & endDate berupa indeks bulan (0=Januari)."
      >
        <DemoLabel text='mode="range"' />
        <Button
          title="Buka Month Picker Rentang"
          color="primary"
          onPress={() => setOpenRange(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${range.startDate !== null ? MONTH_NAMES[range.startDate] : '-'} s/d ${range.endDate !== null ? MONTH_NAMES[range.endDate] : '-'}`}
        </Typography>
        <MonthPicker
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

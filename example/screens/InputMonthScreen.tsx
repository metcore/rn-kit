import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Color,
  Grid,
  InputMonth,
  InputYear,
  LabelForm,
  Typography,
} from '@herca/rn-kit';
import type { PickerFieldValue } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoSurface } from '../components/demo';

export default function InputMonthScreen() {
  const [month, setMonth] = useState<number>();
  const [rangeStart, setRangeStart] = useState<number>();
  const [rangeEnd, setRangeEnd] = useState<number>();
  const [periodMonth, setPeriodMonth] = useState<number>();
  const [periodYear, setPeriodYear] = useState<number>();

  const handleSingle = ({ value }: PickerFieldValue) =>
    setMonth(value ?? undefined);

  const handleRange = ({ startValue, endValue }: PickerFieldValue) => {
    setRangeStart(startValue ?? undefined);
    setRangeEnd(endValue ?? undefined);
  };

  return (
    <DemoScreen
      title="Input Month"
      description="Field bulan yang dibuka lewat MonthPicker. Bentuknya mengikuti InputDate: trigger, tombol clear opsional, dan sheet pemilih."
    >
      <DemoSection
        title="Dasar"
        note="value memakai nomor bulan 1–12: Januari adalah 1, bukan 0. Yang tampil adalah nama bulan sesuai language."
      >
        <DemoSurface>
          <InputMonth
            label="Bulan lahir"
            placeholder="Pilih bulan"
            value={month}
            hasClear
            onChange={handleSingle}
          />
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${month ?? '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Bahasa"
        note="language menentukan nama bulan yang ditampilkan; nomor yang dilaporkan tetap sama."
      >
        <DemoSurface>
          <InputMonth
            label="Month"
            placeholder="Pick a month"
            value={1}
            language="en"
          />
        </DemoSurface>
        <DemoSurface>
          <InputMonth label="Bulan" placeholder="Pilih bulan" value={1} />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Rentang"
        note='mode="range" memunculkan trigger kedua. Kedua trigger membuka sheet yang sama.'
      >
        <DemoSurface>
          <InputMonth
            mode="range"
            label="Periode"
            placeholder="Bulan mulai"
            placeholderEnd="Bulan selesai"
            value={rangeStart}
            valueEnd={rangeEnd}
            onChange={handleRange}
          />
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Rentang: ${rangeStart ?? '-'} → ${rangeEnd ?? '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Tanpa label"
        note="label opsional. Kalau tidak diisi, elemen labelnya tidak dirender sama sekali — bukan label kosong yang tetap memakan ruang."
      >
        <DemoSurface>
          <InputMonth placeholder="Pilih bulan" />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Label sheet kustom"
        note="language mengatur nama bulan; title, cancelLabel dan confirmLabel mengatur teks statis sheet. Keduanya terpisah — mengubah language tidak ikut menerjemahkan tombolnya."
      >
        <DemoSurface>
          <InputMonth
            label="Bulan tagihan"
            placeholder="Pilih bulan"
            title="Bulan tagihan"
            cancelLabel="Tutup"
            confirmLabel="Gunakan"
          />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Bersanding dengan Input Year"
        note="MonthPicker tidak membawa tahun, jadi bulan-dan-tahun disusun dari dua field. Keduanya dibiarkan tanpa label supaya tidak ada dua judul bertumpuk, lalu satu LabelForm menaungi pasangan itu. Grid yang memberi keduanya lebar yang sama."
      >
        <DemoSurface>
          <LabelForm title="Periode tagihan" required />
          <Grid style={styles.pair}>
            <InputMonth
              placeholder="Bulan"
              value={periodMonth}
              onChange={({ value }) => setPeriodMonth(value ?? undefined)}
            />
            <InputYear
              placeholder="Tahun"
              value={periodYear}
              onChange={({ value }) => setPeriodYear(value ?? undefined)}
            />
          </Grid>
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Periode: ${periodMonth ?? '-'} / ${periodYear ?? '-'}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

const styles = StyleSheet.create({
  pair: {
    gap: 8,
  },
});

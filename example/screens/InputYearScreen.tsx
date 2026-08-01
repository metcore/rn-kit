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

export default function InputYearScreen() {
  const [year, setYear] = useState<number>();
  const [rangeStart, setRangeStart] = useState<number>();
  const [rangeEnd, setRangeEnd] = useState<number>();
  const [periodMonth, setPeriodMonth] = useState<number>();
  const [periodYear, setPeriodYear] = useState<number>();

  const handleSingle = ({ value }: PickerFieldValue) =>
    setYear(value ?? undefined);

  const handleRange = ({ startValue, endValue }: PickerFieldValue) => {
    setRangeStart(startValue ?? undefined);
    setRangeEnd(endValue ?? undefined);
  };

  return (
    <DemoScreen
      title="Input Year"
      description="Field tahun yang dibuka lewat YearPicker. Kembaran InputMonth dengan prop dan bentuk nilai yang sama."
    >
      <DemoSection
        title="Dasar"
        note="Tidak ada prop language — tahun berupa angka dan tidak berubah antar-locale."
      >
        <DemoSurface>
          <InputYear
            label="Tahun masuk"
            placeholder="Pilih tahun"
            value={year}
            hasClear
            onChange={handleSingle}
          />
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${year ?? '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Rentang"
        note="YearPicker menampilkan 121 tahun: 60 tahun sebelum sampai 60 tahun sesudah tahun berjalan."
      >
        <DemoSurface>
          <InputYear
            mode="range"
            label="Periode"
            placeholder="Tahun mulai"
            placeholderEnd="Tahun selesai"
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
        title="Teks statis sheet"
        note="title, cancelLabel dan confirmLabel mengganti teks bawaan sheet yang berbahasa Indonesia, tanpa perlu menyentuh YearPicker langsung."
      >
        <DemoSurface>
          <InputYear
            label="Year"
            placeholder="Pick a year"
            title="Choose a year"
            cancelLabel="Cancel"
            confirmLabel="Apply"
          />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Bersanding dengan Input Month"
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

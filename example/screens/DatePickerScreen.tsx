import { useState } from 'react';
import {
  Button,
  Color,
  DatePicker,
  Typography,
  dateFormatter,
  type DateRangeProps,
} from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const formatted = (date?: Date | null) =>
  dateFormatter({ date, options: { format: 'localized', language: 'id' } }) ||
  '-';

export default function DatePickerScreen() {
  const [openSingle, setOpenSingle] = useState(false);
  const [single, setSingle] = useState<DateRangeProps>({});

  const [openRange, setOpenRange] = useState(false);
  const [range, setRange] = useState<DateRangeProps>({});

  const [openBounded, setOpenBounded] = useState(false);
  const [bounded, setBounded] = useState<DateRangeProps>({});

  const [openRequired, setOpenRequired] = useState(false);
  const [required, setRequired] = useState<DateRangeProps>({});
  const [hasError, setHasError] = useState(false);

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return (
    <DemoScreen
      title="Date Picker"
      description="Pemilih tanggal yang muncul di dalam BottomSheet berisi Calendar, dibuka lewat tombol pemicu dan dikonfirmasi lewat tombol Terapkan."
    >
      <DemoSection
        title="Mode tunggal"
        note="mode default single hanya menghasilkan satu tanggal terpilih pada field date."
      >
        <DemoLabel text='mode="single"' />
        <Button
          title="Buka Date Picker"
          color="primary"
          onPress={() => setOpenSingle(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${formatted(single.date)}`}
        </Typography>
        <DatePicker
          mode="single"
          isOpen={openSingle}
          onClose={() => setOpenSingle(false)}
          value={single}
          onChange={setSingle}
        />
      </DemoSection>

      <DemoSection
        title="Mode rentang"
        note="mode range meminta tanggal mulai lalu tanggal akhir sebelum Terapkan bisa dipakai."
      >
        <DemoLabel text='mode="range"' />
        <Button
          title="Buka Date Picker Rentang"
          color="primary"
          onPress={() => setOpenRange(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${formatted(range.startDate)} s/d ${formatted(range.endDate)}`}
        </Typography>
        <DatePicker
          mode="range"
          isOpen={openRange}
          onClose={() => setOpenRange(false)}
          value={range}
          onChange={setRange}
        />
      </DemoSection>

      <DemoSection
        title="Batas tanggal"
        note="minDate dan maxDate mengunci pilihan hanya ke rentang bulan berjalan."
      >
        <DemoLabel text="minDate maxDate" />
        <Button
          title="Buka dengan Batas Bulan Ini"
          color="primary"
          onPress={() => setOpenBounded(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${formatted(bounded.date)}`}
        </Typography>
        <DatePicker
          mode="single"
          isOpen={openBounded}
          onClose={() => setOpenBounded(false)}
          value={bounded}
          onChange={setBounded}
          minDate={minDate}
          maxDate={maxDate}
        />
      </DemoSection>

      <DemoSection
        title="Validasi wajib diisi"
        note="required menampilkan Alert error di dalam sheet bila Terapkan ditekan tanpa memilih tanggal."
      >
        <DemoLabel text="required" />
        <Button
          title="Buka Date Picker Wajib"
          color="primary"
          onPress={() => setOpenRequired(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${formatted(required.date)}`}
        </Typography>
        <DatePicker
          mode="single"
          isOpen={openRequired}
          onClose={() => setOpenRequired(false)}
          value={required}
          onChange={setRequired}
          required
          hasError={hasError}
          onHasError={setHasError}
          hint="Tanggal wajib dipilih sebelum melanjutkan."
        />
      </DemoSection>
    </DemoScreen>
  );
}

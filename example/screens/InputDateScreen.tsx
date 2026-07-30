import { useState } from 'react';
import {
  Color,
  InputDate,
  Typography,
  dateFormatter,
  type DateProps,
  type DateRangeProps,
} from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function InputDateScreen() {
  const [customDate, setCustomDate] = useState<DateProps>(new Date());

  const initialEnd = new Date();
  initialEnd.setDate(initialEnd.getDate() + 7);
  const [customRange, setCustomRange] = useState<DateRangeProps>({
    startDate: new Date(),
    endDate: initialEnd,
  });

  return (
    <DemoScreen
      title="Input Date"
      description="Field tanggal berbentuk input, membuka Date Picker di dalam BottomSheet saat field disentuh."
    >
      <DemoSection
        title="Dasar"
        note="label dan placeholder menyusun tampilan field; menyentuh field membuka Date Picker."
      >
        <DemoLabel text="label placeholder" />
        <InputDate label="Tanggal lahir" placeholder="Pilih tanggal" />
      </DemoSection>

      <DemoSection
        title="Rentang tanggal"
        note="mode range menampilkan dua field, awal dan akhir, dari satu Date Picker rentang."
      >
        <DemoLabel text='mode="range"' />
        <InputDate
          mode="range"
          label="Periode cuti"
          placeholder="Tanggal mulai"
          placeholderDateEnd="Tanggal selesai"
        />
      </DemoSection>

      <DemoSection
        title="Format lewat dateFormatter"
        note="value & onDateChange menjadikan field terkontrol; teks yang tampil diformat manual lewat dateFormatter."
      >
        <DemoLabel text="value + dateFormatter" />
        <InputDate
          hasClear
          label="Tanggal kustom"
          placeholder="Pilih tanggal"
          value={dateFormatter({
            date: customDate,
            options: { format: 'localized', language: 'id' },
          })}
          datePickerProps={{ value: { date: customDate } }}
          onDateChange={(value) => setCustomDate(value.date)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${dateFormatter({ date: customDate, options: { format: 'default' } }) || '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Rentang nilai kustom"
        note="Pola yang sama berlaku untuk rentang: value & valueDateEnd mengisi kedua field dari state."
      >
        <DemoLabel text="value valueDateEnd" />
        <InputDate
          label="Periode kustom"
          mode="range"
          placeholder="Tanggal mulai"
          placeholderDateEnd="Tanggal selesai"
          value={dateFormatter({ date: customRange.startDate })}
          valueDateEnd={dateFormatter({ date: customRange.endDate })}
          datePickerProps={{
            value: {
              startDate: customRange.startDate,
              endDate: customRange.endDate,
            },
          }}
          onDateChange={setCustomRange}
        />
      </DemoSection>

      <DemoSection
        title="Bahasa tampilan"
        note="language mengatur format tanggal terlokalisasi yang muncul di dalam Date Picker & readout field."
      >
        <DemoLabel text='language="en"' />
        <InputDate
          label="Custom Language"
          placeholder="Select date"
          language="en"
        />
      </DemoSection>
    </DemoScreen>
  );
}

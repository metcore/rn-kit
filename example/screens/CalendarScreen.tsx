import { useState } from 'react';
import {
  Calendar,
  Color,
  Typography,
  dateFormatter,
  type DateRangeProps,
} from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoLabel,
  DemoSurface,
} from '../components/demo';

const localized = (date?: Date | null) =>
  dateFormatter({ date, options: { format: 'localized', language: 'id' } }) ||
  '-';
const isoKey = (date?: Date | null) =>
  dateFormatter({ date, options: { format: 'default' } });

export default function CalendarScreen() {
  const [single, setSingle] = useState<DateRangeProps>({});

  const today = new Date();
  const [rangeStart, setRangeStart] = useState<string | null>(
    isoKey(today) || null
  );
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  return (
    <DemoScreen
      title="Calendar"
      description="Kalender bulanan dengan navigasi bulan/tahun, mendukung mode tunggal atau rentang serta tanggal yang dinonaktifkan."
    >
      <DemoSection
        title="Mode tunggal"
        note="mode single (default) mengirim satu tanggal terpilih lewat onChange."
      >
        <DemoLabel text='mode="single"' />
        <DemoSurface>
          <Calendar mode="single" onChange={setSingle} />
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${localized(single.date)}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Mode rentang terkontrol"
        note="dateStart & dateEnd (string YYYY-MM-DD) menjadikan Calendar terkontrol penuh dari state luar."
      >
        <DemoLabel text="dateStart dateEnd" />
        <DemoSurface>
          <Calendar
            mode="range"
            dateStart={rangeStart}
            dateEnd={rangeEnd}
            onChange={(value) => {
              setRangeStart(isoKey(value.startDate) || null);
              setRangeEnd(isoKey(value.endDate) || null);
            }}
          />
        </DemoSurface>
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${rangeStart ?? '-'} s/d ${rangeEnd ?? '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Tanggal dinonaktifkan"
        note="disabledDays menonaktifkan hari tertentu tiap minggu (di sini Minggu), sedangkan markedDates.disabled menonaktifkan tanggal spesifik."
      >
        <DemoLabel text="disabledDays markedDates" />
        <DemoSurface>
          <Calendar
            mode="single"
            disabledDays={{ 0: true }}
            markedDates={{
              [isoKey(new Date(today.getFullYear(), today.getMonth(), 15))]: {
                disabled: true,
              },
            }}
          />
        </DemoSurface>
      </DemoSection>

      <DemoSection
        title="Penanda hari ini"
        note="Angka hari ini diberi warna info[500] supaya mudah ditemukan. Warnanya bisa diganti lewat todayTextColor. Penanda ini kalah dari tanggal terpilih, tanggal nonaktif, dan markedDates — begitu hari ini dipilih, warnanya mengikuti warna terpilih."
      >
        <DemoLabel text="bawaan (info[500])" />
        <DemoSurface>
          <Calendar mode="single" />
        </DemoSurface>
        <DemoLabel text="todayTextColor={Color.orange[500]}" />
        <DemoSurface>
          <Calendar mode="single" todayTextColor={Color.orange[500]} />
        </DemoSurface>
      </DemoSection>
    </DemoScreen>
  );
}

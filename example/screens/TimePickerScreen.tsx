import { useState } from 'react';
import { Button, Color, TimePicker, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

type TimeValue = { hour: number; minute: number };

const formatTime = (value?: TimeValue) =>
  value
    ? `${value.hour.toString().padStart(2, '0')}:${value.minute.toString().padStart(2, '0')}`
    : '-';

export default function TimePickerScreen() {
  const [openBasic, setOpenBasic] = useState(false);
  const [basic, setBasic] = useState<TimeValue>();

  const [openPreset, setOpenPreset] = useState(false);
  const [preset, setPreset] = useState<TimeValue>({ hour: 9, minute: 30 });

  const [openLabel, setOpenLabel] = useState(false);
  const [label, setLabel] = useState<TimeValue>();

  return (
    <DemoScreen
      title="Time Picker"
      description="Pemilih waktu berbentuk wheel jam & menit di dalam BottomSheet, dibuka lewat tombol pemicu dan dikonfirmasi lewat tombol Pilih."
    >
      <DemoSection
        title="Dasar"
        note="onChange mengirim objek { hour, minute } saat tombol Pilih ditekan."
      >
        <DemoLabel text="onChange" />
        <Button
          title="Buka Time Picker"
          color="primary"
          onPress={() => setOpenBasic(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${formatTime(basic)}`}
        </Typography>
        <TimePicker
          isOpen={openBasic}
          onClose={() => setOpenBasic(false)}
          onChange={setBasic}
        />
      </DemoSection>

      <DemoSection
        title="Nilai pra-pilih"
        note="value mengontrol wheel dari luar sehingga picker terbuka langsung pada jam yang ditentukan."
      >
        <DemoLabel text="value={{ hour: 9, minute: 30 }}" />
        <Button
          title="Buka dengan Nilai Awal"
          color="primary"
          onPress={() => setOpenPreset(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${formatTime(preset)}`}
        </Typography>
        <TimePicker
          isOpen={openPreset}
          value={preset}
          onClose={() => setOpenPreset(false)}
          onChange={setPreset}
        />
      </DemoSection>

      <DemoSection
        title="Label kustom"
        note="title, confirmLabel, dan cancelLabel mengganti teks judul serta tombol footer sheet."
      >
        <DemoLabel text="title confirmLabel cancelLabel" />
        <Button
          title="Buka Jam Operasional"
          color="primary"
          onPress={() => setOpenLabel(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${formatTime(label)}`}
        </Typography>
        <TimePicker
          isOpen={openLabel}
          title="Atur Jam Operasional"
          confirmLabel="Simpan"
          cancelLabel="Batalkan"
          onClose={() => setOpenLabel(false)}
          onChange={setLabel}
        />
      </DemoSection>
    </DemoScreen>
  );
}

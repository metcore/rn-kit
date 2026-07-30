import { useState } from 'react';
import { Color, Switch, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function SwitchScreen() {
  const [value, setValue] = useState(false);

  return (
    <DemoScreen
      title="Switch"
      description="Saklar on/off dengan label, hint, dan status error, cocok untuk pengaturan yang berlaku langsung."
    >
      <DemoSection
        title="Terkontrol dasar"
        note="value dan onChange mengendalikan status saklar; readout di bawah menampilkan nilai boolean saat ini."
      >
        <Switch label="Notifikasi push" value={value} onChange={setValue} />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${value ? 'true' : 'false'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Hint & status error"
        note="hint menampilkan keterangan di bawah saklar; hasError mewarnai hint menjadi merah."
      >
        <DemoLabel text="hasError hint" />
        <Switch
          label="Sinkronisasi otomatis"
          value={false}
          hasError
          hint="Sinkronisasi gagal, coba lagi"
        />
      </DemoSection>

      <DemoSection
        title="Keadaan nonaktif"
        note="disabled mengunci interaksi saklar dan menurunkan opasitas keseluruhan komponen."
      >
        <DemoLabel text="disabled" />
        <Switch label="Mode gelap" value={true} disabled />
        <Switch label="Lokasi" value={false} disabled />
      </DemoSection>

      <DemoSection
        title="Warna titik saklar"
        note="dotColor mengganti warna bulatan penggeser, terpisah dari warna latar track."
      >
        <DemoLabel text="dotColor={Color.warning[400]}" />
        <Switch
          label="Tema kustom"
          value={true}
          dotColor={Color.warning[400]}
        />
      </DemoSection>
    </DemoScreen>
  );
}

import { useState } from 'react';
import { CounterButton, Color, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function CounterButtonScreen() {
  const [value, setValue] = useState(1);

  return (
    <DemoScreen
      title="Counter Button"
      description="Tombol penghitung untuk menaikkan atau menurunkan nilai numerik dalam batas minimum dan maksimum."
    >
      <DemoSection
        title="Controlled dasar"
        note="Nilai dikendalikan lewat value dan onChange; readout di bawah menampilkan nilai terkini."
      >
        <CounterButton value={value} min={1} max={10} onChange={setValue} />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${value}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Varian warna"
        note="Prop variant menentukan gaya tombol +/-: default (outline) atau color (filled)."
      >
        <DemoLabel text='variant="color"' />
        <CounterButton value={2} min={0} max={10} variant="color" />
      </DemoSection>

      <DemoSection
        title="Batas minimum & maksimum"
        note="min dan max mengunci tombol turun/naik otomatis begitu nilai mencapai batas."
      >
        <DemoLabel text="value={0} min={0} max={3}" />
        <CounterButton value={0} min={0} max={3} variant="color" />
      </DemoSection>

      <DemoSection
        title="Keadaan nonaktif"
        note="disabledDecrease dan disabledIncrease menonaktifkan tombol turun/naik secara terpisah."
      >
        <DemoLabel text="disabledDecrease disabledIncrease" />
        <CounterButton
          value={5}
          min={0}
          max={10}
          disabledDecrease
          disabledIncrease
        />
      </DemoSection>
    </DemoScreen>
  );
}

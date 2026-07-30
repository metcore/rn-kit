import { useState } from 'react';
import { Color, RadioButton, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const GENDER_OPTIONS = [
  { label: 'Laki-laki', value: 'M' },
  { label: 'Perempuan', value: 'F' },
];

const SHIPPING_OPTIONS = [
  { label: 'Reguler', value: 'regular' },
  { label: 'Sameday', value: 'sameday' },
  { label: 'Instan (habis kuota)', value: 'instant', disabled: true },
];

export default function RadioButtonScreen() {
  const [gender, setGender] = useState<string | null>('M');
  const [shipping, setShipping] = useState<string | null>('regular');

  return (
    <DemoScreen
      title="Radio Button"
      description="Grup pilihan tunggal berbentuk lingkaran radio, dengan dukungan opsi nonaktif dan layout horizontal."
    >
      <DemoSection
        title="Grup controlled"
        note="selectedValue dan onChange mengendalikan opsi terpilih; readout di bawah menampilkan value saat ini."
      >
        <RadioButton
          items={GENDER_OPTIONS}
          selectedValue={gender}
          onChange={setGender}
          direction="horizontal"
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${gender}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Opsi nonaktif & layout vertikal"
        note="Item dengan disabled tidak bisa dipilih; direction='vertical' menyusun opsi ke bawah."
      >
        <DemoLabel text='disabled, direction="vertical"' />
        <RadioButton
          items={SHIPPING_OPTIONS}
          selectedValue={shipping}
          onChange={setShipping}
          direction="vertical"
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${shipping}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

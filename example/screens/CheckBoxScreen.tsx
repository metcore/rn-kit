import { useState } from 'react';
import { CheckBox, CheckBoxList, Color, Typography } from '@herca/rn-kit';
import {
  DemoScreen,
  DemoSection,
  DemoRow,
  DemoLabel,
} from '../components/demo';

const COLORS = [
  'primary',
  'danger',
  'success',
  'warning',
  'orange',
  'purple',
  'info',
] as const;

const TERMS_ITEMS = [
  { label: 'Syarat & ketentuan', value: 'terms', hint: 'Wajib disetujui' },
  { label: 'Promo & informasi', value: 'promo' },
];

export default function CheckBoxScreen() {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <DemoScreen
      title="Checkbox"
      description="Kotak centang untuk persetujuan tunggal atau daftar pilihan jamak dengan berbagai warna aktif."
    >
      <DemoSection
        title="Terkontrol tunggal"
        note="checked dan onChange mengendalikan status centang; hint menampilkan keterangan di bawah label."
      >
        <CheckBox
          checked={checked}
          onChange={setChecked}
          label="Saya menyetujui syarat dan ketentuan"
          hint="Wajib dicentang sebelum melanjutkan"
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Disetujui: ${checked ? 'ya' : 'belum'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Daftar checkbox"
        note="CheckBoxList merender beberapa CheckBox dari array items dan mengelola selectedValues jamak."
      >
        <CheckBoxList
          items={TERMS_ITEMS}
          selectedValues={selected}
          onChange={setSelected}
          direction="vertical"
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${selected.join(', ') || '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Varian warna"
        note="color mengatur warna latar saat checkbox dicentang."
      >
        <DemoRow>
          {COLORS.map((color) => (
            <CheckBox key={color} checked color={color} label={color} />
          ))}
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Keadaan nonaktif"
        note="disabled mengunci interaksi checkbox meski nilainya tetap tampil."
      >
        <DemoLabel text="disabled" />
        <CheckBox checked disabled label="Checkbox nonaktif tercentang" />
        <CheckBox disabled label="Checkbox nonaktif kosong" />
      </DemoSection>
    </DemoScreen>
  );
}

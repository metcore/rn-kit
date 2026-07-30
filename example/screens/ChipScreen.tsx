import { useState } from 'react';
import { Chip, ChipItem, Color, Icon, Typography } from '@herca/rn-kit';
import type {
  ChipOptionProps,
  ChipSelectedProps,
  IconNameProps,
} from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const FRUIT_OPTIONS: ChipOptionProps[] = [
  { label: 'Apel', value: 'apple' },
  { label: 'Jeruk', value: 'orange' },
  { label: 'Mangga', value: 'mango', disabled: true },
];

const ICON_OPTIONS: ChipOptionProps[] = [
  { label: 'Profil', value: 'profile', icon: 'User' },
  { label: 'Terverifikasi', value: 'verified', icon: 'Check' },
];

export default function ChipScreen() {
  const [single, setSingle] = useState<ChipSelectedProps>(['apple']);
  const [multi, setMulti] = useState<ChipSelectedProps>(['apple', 'orange']);
  const [itemSelected, setItemSelected] = useState(false);

  return (
    <DemoScreen
      title="Chip Select"
      description="Chip menampilkan daftar opsi ringkas berbentuk pil, dipakai untuk filter, tag, atau pilihan tunggal/jamak."
    >
      <DemoSection
        title="Pilihan tunggal"
        note="Tanpa prop multiple, memilih chip lain akan menggantikan pilihan sebelumnya; opsi mangga dinonaktifkan via disabled."
      >
        <Chip
          options={FRUIT_OPTIONS}
          selected={single}
          onSelect={setSingle}
          color="primary"
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${single.join(', ') || '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Pilihan jamak"
        note="multiple mengizinkan lebih dari satu chip terpilih sekaligus."
      >
        <DemoLabel text="multiple" />
        <Chip
          options={FRUIT_OPTIONS}
          selected={multi}
          onSelect={setMulti}
          multiple
          color="success"
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${multi.join(', ') || '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Item kustom via renderItem"
        note="Objek opsi bisa membawa properti tambahan (mis. icon) yang dibaca ulang lewat renderItem."
      >
        <DemoLabel text="renderItem={(item) => ...}" />
        <Chip
          options={ICON_OPTIONS}
          selected={[]}
          color="primary"
          renderItem={(item) => (
            <Typography variant="t2" color={Color.primary[1000]}>
              <Icon
                name={item.icon as IconNameProps}
                size={12}
                color={Color.primary[1000]}
              />{' '}
              {item.label}
            </Typography>
          )}
        />
      </DemoSection>

      <DemoSection
        title="ChipItem tunggal"
        note="ChipItem adalah komponen presentasional satu chip, cocok dipakai lepas dari daftar Chip."
      >
        <DemoLabel text="<ChipItem item={...} isSelected={...} />" />
        <ChipItem
          item={{ label: 'Chip satuan', value: 'single' }}
          isSelected={() => itemSelected}
          onPress={() => setItemSelected((prev) => !prev)}
          color="danger"
        />
      </DemoSection>
    </DemoScreen>
  );
}

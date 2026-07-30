import { useState } from 'react';
import { Color, InputSelect, Typography, type ChipValue } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const BRAND_OPTIONS = [
  { label: 'Apple', value: 1 },
  { label: 'Samsung', value: 2 },
  { label: 'Xiaomi', value: 3 },
  { label: 'Oppo', value: 4 },
  { label: 'Vivo', value: 5 },
];

export default function InputSelectScreen() {
  const [single, setSingle] = useState<ChipValue>(null);
  const [multi, setMulti] = useState<ChipValue[]>([]);
  const [preselected, setPreselected] = useState<ChipValue>(1);
  const [selectClickCount, setSelectClickCount] = useState(0);

  const labelOf = (value: ChipValue) =>
    BRAND_OPTIONS.find((opt) => opt.value === value)?.label;

  return (
    <DemoScreen
      title="Input Select"
      description="Field pemicu bottom sheet berisi daftar opsi, mendukung pilihan tunggal, jamak, subtitle, badge, dan mode tanpa modal."
    >
      <DemoSection
        title="Pilihan tunggal"
        note="selectProps.onSubmit menerima array nilai terpilih; ambil elemen pertama untuk pilihan tunggal."
      >
        <InputSelect
          label="Merek favorit"
          options={BRAND_OPTIONS}
          value={labelOf(single)}
          selectProps={{
            value: [single],
            onSubmit: (value) => setSingle(value[0]),
          }}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${labelOf(single) ?? '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Pilihan jamak"
        note="selectProps.multiple mengizinkan lebih dari satu opsi; nilai dan onSubmit berupa array ChipValue."
      >
        <DemoLabel text="selectProps={{ multiple: true }}" />
        <InputSelect
          label="Merek yang dipakai"
          options={BRAND_OPTIONS}
          value={multi.map(labelOf).filter(Boolean).join(', ')}
          selectProps={{
            multiple: true,
            value: multi,
            onSubmit: setMulti,
          }}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${multi.map(labelOf).filter(Boolean).join(', ') || '-'}`}
        </Typography>
      </DemoSection>

      <DemoSection
        title="Preselected"
        note="value + selectProps.value diisi sejak awal untuk menampilkan pilihan yang sudah ada, mis. saat mode edit."
      >
        <InputSelect
          label="Merek utama"
          options={BRAND_OPTIONS}
          value={labelOf(preselected)}
          onClear={() => setPreselected(null)}
          selectProps={{
            value: [preselected],
            onSubmit: (value) => setPreselected(value[0]),
          }}
        />
      </DemoSection>

      <DemoSection
        title="Subtitle & badge"
        note="subtitle menambah baris info kedua; badge menampilkan label kecil berwarna di samping nilai."
      >
        <InputSelect
          label="Status langganan"
          value="Premium"
          subtitle="Aktif sampai 31 Des 2026"
          badge={{ value: 'Baru', color: 'success' }}
          options={BRAND_OPTIONS}
        />
      </DemoSection>

      <DemoSection
        title="Tanpa modal"
        note="useModal={false} tidak membuka bottom sheet; gunakan onSelectClick untuk navigasi kustom, mis. ke layar detail."
      >
        <DemoLabel text="useModal={false}" />
        <InputSelect
          label="Alamat pengiriman"
          value="Jl. Merdeka No. 1, Jakarta"
          useModal={false}
          onSelectClick={() => setSelectClickCount((count) => count + 1)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Ditekan: ${selectClickCount}x`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

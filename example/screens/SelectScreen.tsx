import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Color,
  Select,
  Typography,
  type ChipOptionProps,
  type ChipSelectedProps,
} from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

const FRUITS: ChipOptionProps[] = [
  { label: 'Apel', value: 'apple' },
  { label: 'Jeruk', value: 'orange' },
  { label: 'Mangga', value: 'mango' },
  { label: 'Nanas', value: 'pineapple' },
  { label: 'Semangka', value: 'watermelon' },
];

export default function SelectScreen() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [basicValue, setBasicValue] = useState<ChipSelectedProps>([]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchData, setSearchData] = useState(FRUITS);
  const [searchValue, setSearchValue] = useState<ChipSelectedProps>([]);

  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState<ChipSelectedProps>([]);

  const [presetOpen, setPresetOpen] = useState(false);
  const [presetValue, setPresetValue] = useState<ChipSelectedProps>(['mango']);

  return (
    <DemoScreen
      title="Select"
      description="Select membuka bottom sheet berisi daftar pilihan dengan dukungan pencarian, item kustom, dan nilai pra-pilih."
    >
      <DemoSection
        title="Dasar"
        note="isOpen, data, onClose, dan onSubmit adalah kombinasi minimal untuk single select."
      >
        <Button title="Buka pilihan buah" onPress={() => setBasicOpen(true)} />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${basicValue.join(', ') || '-'}`}
        </Typography>
        <Select
          isOpen={basicOpen}
          data={FRUITS}
          onClose={() => setBasicOpen(false)}
          onSubmit={(val) => {
            setBasicValue(val);
            setBasicOpen(false);
          }}
        />
      </DemoSection>

      <DemoSection
        title="Pencarian"
        note="onSearch dipanggil setelah debounce delaySearch, dipakai untuk memfilter data lokal atau memanggil API."
      >
        <DemoLabel text="onSearch delaySearch={300}" />
        <Button
          title="Buka pencarian buah"
          onPress={() => setSearchOpen(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${searchValue.join(', ') || '-'}`}
        </Typography>
        <Select
          isOpen={searchOpen}
          data={searchData}
          delaySearch={300}
          onSearch={(query) =>
            setSearchData(
              FRUITS.filter((item) =>
                String(item.label).toLowerCase().includes(query.toLowerCase())
              )
            )
          }
          onClose={() => setSearchOpen(false)}
          onSubmit={(val) => {
            setSearchValue(val);
            setSearchOpen(false);
          }}
        />
      </DemoSection>

      <DemoSection
        title="Item kustom"
        note="renderItem mengganti tampilan tiap baris opsi, misalnya menambahkan keterangan di bawah label."
      >
        <DemoLabel text="renderItem={(item) => ...}" />
        <Button title="Buka item kustom" onPress={() => setCustomOpen(true)} />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${customValue.join(', ') || '-'}`}
        </Typography>
        <Select
          isOpen={customOpen}
          data={FRUITS}
          multiple
          onClose={() => setCustomOpen(false)}
          onSubmit={(val) => {
            setCustomValue(val);
            setCustomOpen(false);
          }}
          renderItem={(item) => (
            <View>
              <Typography variant="t2" weight="medium" color={Color.gray[900]}>
                {item.label}
              </Typography>
              <Typography variant="t3" color={Color.gray[600]}>
                {`Kode: ${item.value}`}
              </Typography>
            </View>
          )}
        />
      </DemoSection>

      <DemoSection
        title="Nilai pra-pilih"
        note="Prop value mensinkronkan pilihan yang sudah aktif setiap kali bottom sheet dibuka ulang."
      >
        <DemoLabel text="value={['mango']}" />
        <Button
          title="Buka dengan nilai awal"
          onPress={() => setPresetOpen(true)}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Terpilih: ${presetValue.join(', ') || '-'}`}
        </Typography>
        <Select
          isOpen={presetOpen}
          data={FRUITS}
          value={presetValue}
          onClose={() => setPresetOpen(false)}
          onSubmit={(val) => {
            setPresetValue(val);
            setPresetOpen(false);
          }}
        />
      </DemoSection>
    </DemoScreen>
  );
}

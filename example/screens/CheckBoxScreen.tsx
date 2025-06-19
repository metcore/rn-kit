import {
  CheckBox,
  CheckBoxList,
  Color,
  Container,
  Typography,
} from '@herca/kit';
import { useState } from 'react';
const items = [
  { label: 'Syarat', value: 'syarat' },
  { label: 'Promo', value: 'promo' },
  { label: 'Privasi', value: 'privasi' },
];
export default function CheckBoxScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Container>
      <Typography variant="p2" weight="bold">
        Checkbox
      </Typography>
      <CheckBox
        renderLabel={() => (
          <Typography variant="t2" weight="medium" color={Color.gray[800]}>
            Saya setuju & Ketentuan berlaku
          </Typography>
        )}
        onChange={(val) => console.log(val)}
      />
      <Typography variant="p2" weight="bold">
        Checkbox List
      </Typography>
      <CheckBoxList
        items={items}
        onChange={setSelected}
        selectedValues={selected}
        direction="vertical"
      />
    </Container>
  );
}

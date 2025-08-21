import {
  CheckBox,
  CheckBoxList,
  Color,
  Container,
  Typography,
} from '@herca/rn-kit';
import { useState } from 'react';
import { View } from 'react-native';
const items = [
  { label: 'Syarat', value: 'syarat', hint: 'Sub Label' },
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

      <View style={{ marginTop: 10, gap: 5 }}>
        <Typography>Color variant</Typography>
        <CheckBox
          color="danger"
          label="Saya setuju & Ketentuan berlaku"
          hint="Ini adalah checkbox danger"
        />
        <CheckBox
          color="purple"
          label="Saya setuju & Ketentuan berlaku"
          hint="Ini adalah checkbox purple"
        />
        <CheckBox
          color="info"
          label="Saya setuju & Ketentuan berlaku"
          hint="Ini adalah checkbox info"
        />
        <CheckBox
          color="success"
          label="Saya setuju & Ketentuan berlaku"
          hint="Ini adalah checkbox success"
        />
        <CheckBox
          color="warning"
          label="Saya setuju & Ketentuan berlaku"
          hint="Ini adalah checkbox warning"
        />
        <CheckBox
          color="orange"
          label="Saya setuju & Ketentuan berlaku"
          hint="Ini adalah checkbox orange"
        />
      </View>
    </Container>
  );
}

import { Container, RadioButton } from '@herca/ui-kit';
import { useState } from 'react';

const options = [
  { label: 'Pilihan 1', value: '1', disabled: true },
  { label: 'Pilihan 2', value: '2', checked: true },
  { label: 'Pilihan 3', value: '3' },
];

export default function RadioButtonScreen() {
  const [selected, setSelected] = useState<string | null>(
    () => options.find((opt) => opt.checked)?.value || null
  );

  return (
    <Container>
      <RadioButton
        items={options}
        selectedValue={selected}
        onChange={setSelected}
        direction="vertical"
      />
    </Container>
  );
}

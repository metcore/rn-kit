import { Button, Container, RadioButton, useToast } from '@herca/rn-kit';
import { useState } from 'react';
import type { ColorVariantType } from '../../src/Color/type';

export default function ToastScreen() {
  const [selectedColor, setSelectedColor] = useState<
    ColorVariantType | 'action-primary'
  >('default');
  const toast = useToast();

  const showToast = () => {
    if (selectedColor !== 'action-primary') {
      toast.show('Tes', {
        color: selectedColor,
        action: undefined,
      });
    } else {
      toast.show('Tes', {
        color: 'primary',
        action: () => {},
      });
    }
  };

  const handleChangeSelectColor = (val: string) => {
    setSelectedColor(val as ColorVariantType);
  };
  return (
    <Container>
      <RadioButton
        items={[
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'info',
            value: 'info',
          },
          {
            label: 'warning',
            value: 'warning',
          },
          {
            label: 'orange',
            value: 'orange',
          },
          {
            label: 'danger',
            value: 'danger',
          },
          {
            label: 'success',
            value: 'success',
          },
          {
            label: 'purple',
            value: 'purple',
          },
          {
            label: 'action primary',
            value: 'action-primary',
          },
        ]}
        selectedValue={selectedColor}
        onChange={handleChangeSelectColor}
      />
      <Button title="Tes" onPress={showToast} />
    </Container>
  );
}

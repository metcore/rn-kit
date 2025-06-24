import { Button, Container, RadioButton, useToast } from '@herca/kit';
import { useState } from 'react';

export default function ToastScreen() {
  const [selectedColor, setSelectedColor] = useState<string>('default');
  const toast = useToast();

  const showToast = () => {
    toast.show('Tes', {
      color: selectedColor,
    });
  };

  const handleChangeSelectColor = (val) => {
    setSelectedColor(val);
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
        ]}
        selectedValue={selectedColor}
        onChange={handleChangeSelectColor}
      />
      <Button title="Tes" onPress={showToast} />
    </Container>
  );
}

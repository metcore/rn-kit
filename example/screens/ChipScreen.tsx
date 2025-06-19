import {
  Chip,
  Color,
  Container,
  Icon,
  Typography,
  type ChipSelectedProps,
} from '@herca/kit';
import { useState } from 'react';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 23123 2', value: '2', disabled: true },
  { label: 'Optionzzz 3', value: '3' },
  { label: 'Option tambahan', value: '4' },
  { label: 'Option 1', value: '5' },
  { label: 'Option 1', value: '6' },
  { label: 'Option 1', value: '7' },
  { label: 'Option 1', value: '8' },
  { label: 'Option 1', value: '9' },
];

const ChipScreen = () => {
  const [selectedDefault, setSelectedDefault] = useState();
  const [selectedCustom, setSelectedCustom] = useState();
  const handleOnSelectCustom = (val: ChipSelectedProps) => {
    setSelectedCustom(val);
  };
  return (
    <Container>
      <Typography variant="p2" weight="semibold">
        Chip Default
      </Typography>
      <Chip
        options={options}
        selected={selectedDefault}
        onSelect={setSelectedDefault}
        direction="horizontal"
        color="primary"
      />
      <Typography variant="p2" weight="semibold">
        Chip 2
      </Typography>
      <Chip
        options={options}
        selected={selectedDefault}
        onSelect={setSelectedDefault}
        direction="vertical"
        scrollable={false}
        color="danger"
        block
      />
      <Typography variant="p2" weight="semibold">
        Chip Custom
      </Typography>
      <Chip
        options={options}
        selected={selectedCustom}
        onSelect={handleOnSelectCustom}
        direction="vertical"
        size="large"
        color="primary"
        multiple
        renderItem={(item, isSelected, isDisabled) => (
          <Typography
            variant="t2"
            color={
              isDisabled
                ? Color.base.white100
                : isSelected
                  ? Color.primary[1000]
                  : Color.primary[1000]
            }
          >
            <Icon
              name="User"
              size={10}
              color={
                isDisabled
                  ? Color.base.white100
                  : isSelected
                    ? Color.primary[1000]
                    : Color.primary[1000]
              }
            />
            {item.label}
          </Typography>
        )}
      />
    </Container>
  );
};

export default ChipScreen;

import { Container, CounterButton, Devider, Typography } from '@herca/rn-kit';
import { useState } from 'react';

export default function CounterButtonScreen() {
  const [value, setValue] = useState<number>(0);
  return (
    <Container style={{ gap: 8 }}>
      <CounterButton
        max={10}
        min={0}
        onChange={(val) => setValue(val)}
        variant="color"
      />
      <Devider />
      <CounterButton
        max={10}
        min={0}
        onChange={(val) => setValue(val)}
        variant="default"
      />
      <Typography> The Value is : {value}</Typography>
    </Container>
  );
}

import { Container, CounterButton, Devider, Typography } from '@herca/rn-kit';
import { useState } from 'react';

export default function CounterButtonScreen() {
  const [value, setValue] = useState<number>(0);
  return (
    <Container style={{ gap: 8 }}>
      <CounterButton
        max={10}
        min={0}
        onChange={(val: number) => setValue(val)}
        variant="color"
      />
      <CounterButton
        max={10}
        min={0}
        onChange={(val: number) => setValue(val)}
        variant="color"
        disabledIncrease={true}
        disabledDecrease={true}
      />
      <Devider />
      <CounterButton
        max={44}
        min={0}
        onChange={(val: number) => setValue(val)}
        variant="default"
      />
      <CounterButton
        max={10}
        min={0}
        onChange={(val: number) => setValue(val)}
        variant="default"
        disabledIncrease={true}
        disabledDecrease={true}
      />
      <Typography> The Value is : {value}</Typography>
    </Container>
  );
}

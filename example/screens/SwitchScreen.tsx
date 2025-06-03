import { Container, Switch, Typography } from '@herca/ui-kit';
import { useState } from 'react';

export default function SwitchScreen() {
  const [value, setValue] = useState(false);
  return (
    <Container>
      <Switch label="Switch" onChange={(val) => setValue(val)} />
      <Typography>The value : {value ? 'true' : 'false'}</Typography>
      <Switch label="Switch Has Error" hasError hint="Switch input has error" />
    </Container>
  );
}

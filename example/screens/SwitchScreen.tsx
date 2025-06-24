import { Container, Switch, Typography } from '@herca/rn-kit';
import { useState } from 'react';

export default function SwitchScreen() {
  const [value, setValue] = useState(false);
  return (
    <Container>
      <Switch label="Switch" onChange={(val) => setValue(val)} />
      <Typography>The value : {value ? 'true' : 'false'}</Typography>
      <Switch
        label="Value"
        value={true}
        hasError
        hint="Switch input has error"
      />
      <Switch
        label="Switch disabled"
        disabled
        hasError
        hint="Switch input has error"
      />
      <Switch
        label="Value"
        value={true}
        disabled
        hasError
        hint="Switch input has error"
      />
      <Switch label="Switch Has Error" hasError hint="Switch input has error" />
    </Container>
  );
}

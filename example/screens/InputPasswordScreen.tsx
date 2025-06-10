import { Container, InputPassword, Typography } from '@herca/ui-kit';

export default function InputPasswordScreen() {
  return (
    <Container style={{ gap: 4 }}>
      <Typography variant="t1">
        Input Passord, extend from Input, so al the props on Input Component can
        be use
      </Typography>

      <InputPassword label="Basic" placeholder="Type here ..." />
      <InputPassword
        icon="User"
        label="With Left Icon"
        placeholder="Type here ..."
      />
      <InputPassword
        icon="User"
        iconRight="Eye"
        label="With Right Icon"
        placeholder="Type here ..."
        clearButton={true}
      />

      <InputPassword
        label="On Click Icon"
        icon="User"
        iconRight="Search"
        placeholder="Type Here ... "
        clearButton
        onPressIconLeft={() => console.log('Kiri')}
        onPressIconRight={() => console.log('Kanan')}
      />
      <InputPassword
        icon="User"
        label="With Clear Button"
        placeholder="Type here ..."
        clearButton={true}
      />
      <InputPassword
        icon="User"
        label="With Hint"
        placeholder="Type here ..."
        clearButton={true}
        hint="Masukan angka 50 karakter"
      />
      <InputPassword
        icon="User"
        label="Has Error"
        placeholder="Type here ..."
        clearButton={true}
        hasError={true}
        hint="Masukan angka 50 karakter"
      />
    </Container>
  );
}

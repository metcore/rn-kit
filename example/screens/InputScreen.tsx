import { Container, Input } from '@herca/ui-kit';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

export default function InputScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <Container style={{ gap: 12 }}>
          <Input label="Basic" placeholder="Type here ..." />
          <Input
            icon="User"
            label="With Left Icon"
            placeholder="Type here ..."
          />
          <Input
            icon="User"
            iconRight="Eye"
            label="With Right Icon"
            placeholder="Type here ..."
            clearButton={true}
          />

          <Input
            label="On Click Icon"
            icon="User"
            iconRight="Search"
            placeholder="Type Here ... "
            clearButton
            onPressIconLeft={() => console.log('Kiri')}
            onPressIconRight={() => console.log('Kanan')}
          />
          <Input
            icon="User"
            label="With Clear Button"
            placeholder="Type here ..."
            clearButton={true}
          />
          <Input
            icon="User"
            label="With Hint"
            placeholder="Type here ..."
            clearButton={true}
            hint="Masukan angka 50 karakter"
          />
          <Input
            icon="User"
            label="Has Error"
            placeholder="Type here ..."
            clearButton={true}
            hasError={true}
            hint="Masukan angka 50 karakter"
          />
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

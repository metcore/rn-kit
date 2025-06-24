import { Container, TextArea } from '@herca/rn-kit';

export default function TextAreaScreen() {
  return (
    <Container>
      <TextArea label="Text area" hasError={true} hint="Tes" />
    </Container>
  );
}

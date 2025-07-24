import { Container, TextEditor } from '@herca/rn-kit';

export default function TextEditorScreen() {
  return (
    <Container style={{ flex: 1 }}>
      <TextEditor label="deskripsi" hint="Fill this" />
    </Container>
  );
}

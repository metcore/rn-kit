import { Container, Icon, Label } from '@herca/ui-kit';

export default function LabelScreen() {
  return (
    <Container>
      <Label label="a" />
      <Label icon="Calendar" color="success" />
      <Label label="a">
        <Icon name="User" />
      </Label>
    </Container>
  );
}

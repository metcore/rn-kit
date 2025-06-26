import { Container, DropDown, Icon } from '@herca/rn-kit';
const options = [
  {
    label: 'Januari',
    value: 'Jauary',
  },
  {
    label: 'Februari',
    value: 'Febriari',
  },
  {
    label: 'Maret',
    value: 'Maret',
  },
];

export default function DropDownScreen() {
  return (
    <Container>
      <DropDown
        options={options}
        maxHeight={200}
        renderButton={<Icon name="Eye" />}
      />
    </Container>
  );
}

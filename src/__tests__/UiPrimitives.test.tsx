import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Card from '../Ui/Card';
import Center from '../Ui/Center';
import Col from '../Ui/Col';
import Container from '../Ui/Container';
import Devider from '../Ui/Devider';
import Gap from '../Ui/Gap';
import Grid from '../Ui/Grid';
import Footer from '../Ui/Footer';
import Provider from '../Provider/Provider';
import ViewInsets from '../Ui/ViewInsets';
import { renderWithProviders } from './helpers/render';

// Every Ui/* primitive is a thin wrapper over View whose only contract is
// "render my children and take a testID". They are covered as a table rather
// than one describe each, so adding a primitive means adding a row.
const wrappers: Array<{
  name: string;
  render: (testID?: string) => React.ReactElement;
  // ViewInsets reads useSafeAreaInsets, so it cannot use the bare renderer.
  renderer?: typeof render;
}> = [
  {
    name: 'Container',
    render: (id) => (
      <Container testID={id}>
        <Text>body</Text>
      </Container>
    ),
  },
  {
    name: 'Card',
    render: (id) => (
      <Card testID={id}>
        <Text>body</Text>
      </Card>
    ),
  },
  {
    name: 'Center',
    render: (id) => (
      <Center testID={id}>
        <Text>body</Text>
      </Center>
    ),
  },
  {
    name: 'Gap',
    render: (id) => (
      <Gap testID={id}>
        <Text>body</Text>
      </Gap>
    ),
  },
  {
    name: 'Grid',
    render: (id) => (
      <Grid testID={id} style={{}}>
        <Text>body</Text>
      </Grid>
    ),
  },
  {
    name: 'Col',
    render: (id) => (
      <Col testID={id}>
        <Text>body</Text>
      </Col>
    ),
  },
  {
    name: 'ViewInsets',
    render: (id) => (
      <ViewInsets testID={id}>
        <Text>body</Text>
      </ViewInsets>
    ),
    renderer: renderWithProviders,
  },
];

describe.each(wrappers)('$name', ({ render: renderWrapper, renderer }) => {
  const mount = renderer ?? render;

  it('renders its children', () => {
    const { getByText } = mount(renderWrapper('wrapper'));

    expect(getByText('body')).toBeTruthy();
  });

  it('applies the testID it was given', () => {
    const { getByTestId } = mount(renderWrapper('wrapper'));

    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = mount(renderWrapper(undefined));

    // Children still mount, so the null below is about the id, not the tree.
    expect(getByText('body')).toBeTruthy();
    expect(queryByTestId('wrapper')).toBeNull();
  });
});

describe('Devider', () => {
  it('applies the testID it was given', () => {
    const { getByTestId } = render(<Devider testID="rule" />);

    expect(getByTestId('rule')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { queryByTestId } = render(<Devider />);

    expect(queryByTestId('rule')).toBeNull();
  });
});

describe('Card', () => {
  it('swaps to an image background when one is given', () => {
    const { getByTestId } = render(
      <Card testID="hero" backgroundImage={{ uri: 'file://bg.png' }}>
        <Text>body</Text>
      </Card>
    );

    // Same id, but now on an ImageBackground rather than the plain View.
    expect(getByTestId('hero').props.source).toEqual({ uri: 'file://bg.png' });
  });
});

describe('Col', () => {
  it('turns its size into a twelfths width', () => {
    const { getByTestId } = render(
      <Col testID="half" size={6}>
        <Text>body</Text>
      </Col>
    );

    expect(getByTestId('half')).toHaveStyle({ width: '50%' });
  });
});

// Footer is the odd one out: it renders null and hands its element to the
// Provider's footer slot, so it only appears once wrapped in <Provider>.
describe('Footer', () => {
  it('renders its children into the provider footer slot', () => {
    const { getByText, getByTestId } = render(
      <Provider>
        <Footer testID="actions">
          <Text>Simpan</Text>
        </Footer>
      </Provider>
    );

    expect(getByTestId('actions')).toBeTruthy();
    expect(getByText('Simpan')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(
      <Provider>
        <Footer>
          <Text>Simpan</Text>
        </Footer>
      </Provider>
    );

    expect(getByText('Simpan')).toBeTruthy();
    expect(queryByTestId('actions')).toBeNull();
  });
});

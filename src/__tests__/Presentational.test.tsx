import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Alert from '../Alert/Alert';
import Avatar from '../Avatar/Avatar';
import AvatarGroup from '../Avatar/AvatarGroup';
import Badge from '../Badge/Badge';
import BadgeIcon from '../BadgeIcon/BadgeIcon';
import Icon from '../Icon/Icon';
import Label from '../Label/Label';
import List from '../List/List';
import ListItem from '../List/ListItem';
import Loading from '../Loading/Loading';
import Skeleton from '../Skeleton/Skeleton';
import Spinner from '../Spinner/Spinner';
import Typography from '../Typography/Typography';

// These components have no callbacks -- their contract is "render what I was
// given and take a testID". Covered as a table so adding a component is a row,
// not another describe block. Anything with behaviour worth asserting gets its
// own describe underneath.
const components: Array<{
  name: string;
  render: (testID?: string) => React.ReactElement;
}> = [
  {
    name: 'Alert',
    render: (id) => <Alert testID={id} title="Judul" message="Pesan" />,
  },
  { name: 'Avatar', render: (id) => <Avatar testID={id} name="Dafi" /> },
  {
    name: 'AvatarGroup',
    render: (id) => <AvatarGroup testID={id} avatars={[{ name: 'A' }]} />,
  },
  {
    name: 'Badge',
    render: (id) => <Badge testID={id} value="3" color="#EB5757" />,
  },
  { name: 'BadgeIcon', render: (id) => <BadgeIcon testID={id} icon="Check" /> },
  { name: 'Icon', render: (id) => <Icon testID={id} name="Check" /> },
  { name: 'Label', render: (id) => <Label testID={id} label="Baru" /> },
  {
    name: 'List',
    render: (id) => (
      <List testID={id}>
        <ListItem>
          <Text>baris</Text>
        </ListItem>
      </List>
    ),
  },
  {
    name: 'ListItem',
    render: (id) => (
      <ListItem testID={id}>
        <Text>baris</Text>
      </ListItem>
    ),
  },
  { name: 'Loading', render: (id) => <Loading testID={id} /> },
  { name: 'Skeleton', render: (id) => <Skeleton testID={id} /> },
  { name: 'Spinner', render: (id) => <Spinner testID={id} /> },
  {
    name: 'Typography',
    render: (id) => <Typography testID={id}>teks</Typography>,
  },
];

describe.each(components)('$name', ({ render: renderComponent }) => {
  it('mounts with its minimum props', () => {
    expect(render(renderComponent('probe')).toJSON()).toBeTruthy();
  });

  it('applies the testID it was given', () => {
    const { getByTestId } = render(renderComponent('probe'));

    expect(getByTestId('probe')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { toJSON, queryByTestId } = render(renderComponent(undefined));

    // Still renders, so the null below is about the id, not an empty tree.
    expect(toJSON()).toBeTruthy();
    expect(queryByTestId('probe')).toBeNull();
  });
});

describe('Alert', () => {
  it('shows the title and message it was given', () => {
    const { getByText } = render(
      <Alert testID="alert" title="Gagal" message="Coba lagi" />
    );

    expect(getByText('Gagal')).toBeTruthy();
    expect(getByText('Coba lagi')).toBeTruthy();
  });

  // `hide` sets display:'none' rather than returning null; RNTL excludes
  // hidden elements from queries by default, so this asserts what a user can
  // actually see. Mutation-checked against that style line.
  it('renders nothing visible while hidden', () => {
    const { queryByText } = render(
      <Alert testID="alert" title="Gagal" message="Coba lagi" hide />
    );

    expect(queryByText('Gagal')).toBeNull();
  });
});

describe('Avatar', () => {
  // `name` is documented as the initials themselves ("Initials to show if
  // image is not available"), not a full name the component abbreviates --
  // README_AVATARGROUP.md passes 'JS', 'EM'. It renders the string verbatim.
  it('shows the given initials when there is no source', () => {
    const { getByText } = render(<Avatar testID="ava" name="DH" />);

    expect(getByText('DH')).toBeTruthy();
  });
});

describe('AvatarGroup', () => {
  it('caps the visible avatars and counts the overflow', () => {
    const avatars = [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
    ];
    const { getByText } = render(
      <AvatarGroup testID="group" avatars={avatars} maxVisible={2} />
    );

    expect(getByText('+2')).toBeTruthy();
  });
});

describe('Badge', () => {
  it('shows its value, and drops it in dot mode', () => {
    const { getByText, queryByText, rerender } = render(
      <Badge testID="badge" value="7" color="#EB5757" />
    );

    expect(getByText('7')).toBeTruthy();

    rerender(<Badge testID="badge" value="7" color="#EB5757" dot />);

    expect(queryByText('7')).toBeNull();
  });
});

describe('Icon', () => {
  it('renders nothing for an unknown name', () => {
    // @ts-expect-error -- deliberately outside IconNameProps
    const { toJSON } = render(<Icon testID="icon" name="does-not-exist" />);

    expect(toJSON()).toBeNull();
  });
});

describe('Loading', () => {
  it('shows the message it was given', () => {
    const { getByText } = render(
      <Loading testID="loading" message="Memuat data..." />
    );

    expect(getByText('Memuat data...')).toBeTruthy();
  });
});

describe('Typography', () => {
  it('renders its children as text', () => {
    const { getByText } = render(
      <Typography testID="text">Halo dunia</Typography>
    );

    expect(getByText('Halo dunia')).toBeTruthy();
  });
});

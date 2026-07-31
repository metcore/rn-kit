import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import DropDown from '../DropDown/DropDown';

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

// The `-modal` and per-option testIDs stay uncovered here, deliberately.
// handleToggle only calls setIsOpen(true) from inside the
// UIManager.measureInWindow callback, which it reaches only when
// findNodeHandle returns a handle -- and under react-test-renderer it does
// not. Re-verified: pressing the trigger leaves queryByTestId('menu-modal')
// null. Forcing it open would mean faking both RN internals, so the overlay
// would exist only because the test built it. Deferred to E2E instead; the
// ids themselves are wired in DropDown.tsx.
describe('DropDown testID', () => {
  it('derives trigger testID', () => {
    const { getByTestId } = render(
      <DropDown
        options={options}
        onSelect={() => {}}
        testID="menu"
        renderButton={<Text>Open</Text>}
      />
    );

    expect(getByTestId('menu-trigger')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <DropDown
        options={options}
        onSelect={() => {}}
        renderButton={<Text>Open</Text>}
      />
    );

    expect(queryByTestId('undefined-trigger')).toBeNull();
  });
});

import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import DropDown from '../DropDown/DropDown';

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
];

// Note: DropDown gates its overlay open state behind
// findNodeHandle/UIManager.measureInWindow, which no-op under the RN jest
// preset (no real native layout), so the overlay/option testIDs can't be
// driven open in this environment. They are wired (see DropDown.tsx) but
// only the trigger is asserted here; option coverage is deferred to manual/E2E.
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

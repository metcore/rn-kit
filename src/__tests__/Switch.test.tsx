import { render } from '@testing-library/react-native';
import Switch from '../Input/Switch';

describe('Switch testID', () => {
  it('forwards testID to the pressable and derives -label', () => {
    const { getByTestId } = render(
      <Switch value={false} onChange={() => {}} testID="sw" label="Enable" />
    );
    expect(getByTestId('sw')).toBeTruthy();
    expect(getByTestId('sw-label')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <Switch value={false} onChange={() => {}} label="Enable" />
    );
    expect(queryByTestId('sw')).toBeNull();
    expect(queryByTestId('sw-label')).toBeNull();
  });
});

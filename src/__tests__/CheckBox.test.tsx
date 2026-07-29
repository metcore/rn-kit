import { render } from '@testing-library/react-native';
import CheckBox from '../CheckBox/CheckBox';

describe('CheckBox testID', () => {
  it('forwards testID to the pressable and derives -label', () => {
    const { getByTestId } = render(
      <CheckBox checked={false} onChange={() => {}} testID="cb" label="Agree" />
    );
    expect(getByTestId('cb')).toBeTruthy();
    expect(getByTestId('cb-label')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <CheckBox checked={false} onChange={() => {}} label="Agree" />
    );
    expect(queryByTestId('cb')).toBeNull();
    expect(queryByTestId('cb-label')).toBeNull();
  });
});

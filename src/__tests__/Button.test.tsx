import { render } from '@testing-library/react-native';
import Button from '../Button/Button';

describe('Button testID', () => {
  it('forwards testID to the pressable', () => {
    const { getByTestId } = render(
      <Button title="Go" onPress={() => {}} testID="submit-btn" />
    );
    expect(getByTestId('submit-btn')).toBeTruthy();
  });
  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(<Button title="Go" onPress={() => {}} />);
    expect(queryByTestId('submit-btn')).toBeNull();
  });
});

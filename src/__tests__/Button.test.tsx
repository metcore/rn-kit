import { fireEvent, render } from '@testing-library/react-native';
import { ActivityIndicator, Text } from 'react-native';
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

describe('Button behaviour', () => {
  it('calls onPress once when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Go" onPress={onPress} testID="submit-btn" />
    );

    fireEvent.press(getByTestId('submit-btn'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ignores taps while disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Go" disabled onPress={onPress} testID="submit-btn" />
    );

    fireEvent.press(getByTestId('submit-btn'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows a spinner alongside the title while loading', () => {
    const { UNSAFE_queryAllByType, getByText, rerender } = render(
      <Button title="Go" onPress={() => {}} testID="submit-btn" />
    );

    expect(UNSAFE_queryAllByType(ActivityIndicator)).toHaveLength(0);

    rerender(
      <Button title="Go" loading onPress={() => {}} testID="submit-btn" />
    );

    expect(UNSAFE_queryAllByType(ActivityIndicator)).toHaveLength(1);
    expect(getByText('Go')).toBeTruthy();
  });

  it('renders children instead of the title when given', () => {
    const { getByText, queryByText } = render(
      <Button title="Go" onPress={() => {}} testID="submit-btn">
        <Text>Custom</Text>
      </Button>
    );

    expect(getByText('Custom')).toBeTruthy();
    expect(queryByText('Go')).toBeNull();
  });
});

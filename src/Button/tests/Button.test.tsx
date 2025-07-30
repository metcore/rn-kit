import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with title', () => {
    const { getByText } = render(<Button title="Submit" onPress={() => {}} />);
    expect(getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Button title="Click me" onPress={mockFn} />);
    fireEvent.press(getByText('Click me'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" onPress={mockFn} disabled />
    );
    fireEvent.press(getByText('Disabled'));
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('renders loading indicator when loading', () => {
    const { getByTestId } = render(
      <Button title="Load" onPress={() => {}} loading />
    );
    // You might want to set `testID="loading-indicator"` in <ActivityIndicator /> in the component
    // For now, we check for presence of ActivityIndicator via accessibilityRole
    const indicator = getByTestId('ActivityIndicator');
    expect(indicator).toBeTruthy();
  });

  it('renders custom child instead of title', () => {
    const { queryByText, getByText } = render(
      <Button onPress={() => {}}>
        <React.Fragment>
          <Text>Custom Child</Text>
        </React.Fragment>
      </Button>
    );
    expect(getByText('Custom Child')).toBeTruthy();
    expect(queryByText('title')).toBeNull();
  });
});

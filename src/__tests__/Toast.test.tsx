import { render } from '@testing-library/react-native';
import Toast from '../Toast/Toast';

describe('Toast testID', () => {
  it('forwards testID to the root view and derives -clear', () => {
    const { getByTestId } = render(
      <Toast visible message="Saved" testID="toast" />
    );
    expect(getByTestId('toast')).toBeTruthy();
    expect(getByTestId('toast-clear')).toBeTruthy();
    expect(getByTestId('toast-message')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { getByText, queryByTestId } = render(
      <Toast visible message="Saved" />
    );

    expect(getByText('Saved')).toBeTruthy();
    expect(queryByTestId('toast')).toBeNull();
    expect(queryByTestId('toast-clear')).toBeNull();
    expect(queryByTestId('undefined-message')).toBeNull();
  });
});

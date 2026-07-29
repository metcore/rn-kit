import { render } from '@testing-library/react-native';
import InputSelect from '../Input/InputSelect';
import { ToastProvider } from '../Toast/ToastContext';

describe('InputSelect testID', () => {
  it('derives trigger, label, clear and error testIDs', () => {
    const { getByTestId } = render(
      <ToastProvider>
        <InputSelect
          testID="favorite"
          label="Favorite"
          value="Apple"
          hint="Something went wrong"
          hasError
          onClear={() => {}}
        />
      </ToastProvider>
    );

    expect(getByTestId('favorite-trigger')).toBeTruthy();
    expect(getByTestId('favorite-label')).toBeTruthy();
    expect(getByTestId('favorite-clear')).toBeTruthy();
    expect(getByTestId('favorite-error')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <ToastProvider>
        <InputSelect label="Favorite" hint="hint" onClear={() => {}} />
      </ToastProvider>
    );

    expect(queryByTestId('favorite-trigger')).toBeNull();
    expect(queryByTestId('undefined-trigger')).toBeNull();
  });
});

import { render, fireEvent } from '@testing-library/react-native';
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

  // InputSelect passes its RAW testID to <Select>, which owns its own suffix
  // namespace (deriving `-sheet`/`-search`/`-submit`/`-option-*`). Select's
  // search Input mounts inside BottomSheet's children once its Modal is
  // visible, so we can assert precedence indirectly: open the select and
  // confirm a testID passed via selectProps does not clobber the id Select
  // derives from InputSelect's base.
  it('does not let selectProps.testID override the derived sheet id', () => {
    const { getByTestId, queryByTestId } = render(
      <ToastProvider>
        <InputSelect
          testID="favorite"
          label="Favorite"
          selectProps={{ testID: 'bogus' }}
        />
      </ToastProvider>
    );

    fireEvent.press(getByTestId('favorite-trigger'));

    expect(getByTestId('favorite-search-input')).toBeTruthy();
    expect(queryByTestId('bogus-search-input')).toBeNull();
  });
});

describe('InputSelect behaviour', () => {
  it('calls onSelectClick and opens the sheet when the trigger is pressed', () => {
    const onSelectClick = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <ToastProvider>
        <InputSelect
          testID="favorite"
          label="Favorite"
          onSelectClick={onSelectClick}
        />
      </ToastProvider>
    );

    expect(queryByTestId('favorite-sheet')).toBeNull();

    fireEvent.press(getByTestId('favorite-trigger'));

    expect(onSelectClick).toHaveBeenCalledTimes(1);
    expect(getByTestId('favorite-sheet')).toBeTruthy();
  });

  it('calls onClear when the clear button is pressed', () => {
    const onClear = jest.fn();
    const { getByTestId } = render(
      <ToastProvider>
        <InputSelect
          testID="favorite"
          label="Favorite"
          value="Apple"
          onClear={onClear}
        />
      </ToastProvider>
    );

    fireEvent.press(getByTestId('favorite-clear'));

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('shows the clear button only once there is a value', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <ToastProvider>
        <InputSelect testID="favorite" label="Favorite" onClear={() => {}} />
      </ToastProvider>
    );

    expect(queryByTestId('favorite-clear')).toBeNull();

    rerender(
      <ToastProvider>
        <InputSelect
          testID="favorite"
          label="Favorite"
          value="Apple"
          onClear={() => {}}
        />
      </ToastProvider>
    );

    expect(getByTestId('favorite-clear')).toBeTruthy();
  });
});

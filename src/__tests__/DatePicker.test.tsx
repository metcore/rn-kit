import { fireEvent, render } from '@testing-library/react-native';
import DatePicker from '../DatePicker/DatePicker';

describe('DatePicker testID', () => {
  it('derives cancel and confirm testIDs when open', () => {
    const { getByTestId } = render(
      <DatePicker
        testID="birthday"
        isOpen
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(getByTestId('birthday-sheet')).toBeTruthy();
    expect(getByTestId('birthday-cancel')).toBeTruthy();
    expect(getByTestId('birthday-confirm')).toBeTruthy();
  });

  it('derives error testID when hasError', () => {
    const { getByTestId } = render(
      <DatePicker
        testID="birthday"
        isOpen
        hasError
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(getByTestId('birthday-error')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(
      <DatePicker isOpen onClose={() => {}} onChange={() => {}} />
    );

    expect(queryByTestId('undefined-sheet')).toBeNull();
    expect(queryByTestId('undefined-cancel')).toBeNull();
    expect(queryByTestId('undefined-confirm')).toBeNull();
  });
});

describe('DatePicker behaviour', () => {
  it('reports a value and closes on confirm', () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <DatePicker
        isOpen
        testID="birthday"
        onChange={onChange}
        onClose={onClose}
      />
    );

    fireEvent.press(getByTestId('birthday-confirm'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes without reporting anything on cancel', () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <DatePicker
        isOpen
        testID="birthday"
        onChange={onChange}
        onClose={onClose}
      />
    );

    fireEvent.press(getByTestId('birthday-cancel'));

    expect(onChange).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

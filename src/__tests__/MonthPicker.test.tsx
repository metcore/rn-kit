import { fireEvent, render } from '@testing-library/react-native';
import MonthPicker from '../DatePicker/MonthPicker';

it('derives cancel, confirm and per-month option testIDs when open', () => {
  const { getByTestId } = render(
    <MonthPicker isOpen onClose={() => {}} testID="month" />
  );

  expect(getByTestId('month-sheet')).toBeTruthy();
  expect(getByTestId('month-cancel')).toBeTruthy();
  expect(getByTestId('month-confirm')).toBeTruthy();
  expect(getByTestId('month-option-0')).toBeTruthy();
});

it('renders no testID when prop omitted', () => {
  const { queryByTestId } = render(<MonthPicker isOpen onClose={() => {}} />);

  expect(queryByTestId('undefined-sheet')).toBeNull();
  expect(queryByTestId('undefined-cancel')).toBeNull();
  expect(queryByTestId('undefined-confirm')).toBeNull();
});

describe('MonthPicker behaviour', () => {
  it('reports the picked month and closes on confirm', () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <MonthPicker
        isOpen
        testID="month"
        onChange={onChange}
        onClose={onClose}
      />
    );

    fireEvent.press(getByTestId('month-option-2'));
    fireEvent.press(getByTestId('month-confirm'));

    expect(onChange).toHaveBeenCalledWith([2]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes without reporting anything on cancel', () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <MonthPicker
        isOpen
        testID="month"
        onChange={onChange}
        onClose={onClose}
      />
    );

    fireEvent.press(getByTestId('month-option-2'));
    fireEvent.press(getByTestId('month-cancel'));

    expect(onChange).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('accumulates every tapped month in multiple mode', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <MonthPicker isOpen mode="multiple" testID="month" onChange={onChange} />
    );

    fireEvent.press(getByTestId('month-option-0'));
    fireEvent.press(getByTestId('month-option-3'));
    fireEvent.press(getByTestId('month-confirm'));

    expect(onChange).toHaveBeenCalledWith([0, 3]);
  });

  it('drops a month that is tapped twice in multiple mode', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <MonthPicker isOpen mode="multiple" testID="month" onChange={onChange} />
    );

    fireEvent.press(getByTestId('month-option-5'));
    fireEvent.press(getByTestId('month-option-5'));
    fireEvent.press(getByTestId('month-confirm'));

    expect(onChange).toHaveBeenCalledWith([]);
  });
});

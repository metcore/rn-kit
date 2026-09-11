import { fireEvent, render } from '@testing-library/react-native';
import MonthPicker from '../DatePicker/MonthPicker';
import { isHighlighted } from './helpers/isHighlighted';

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

describe('MonthPicker language', () => {
  it('labels months in Indonesian by default', () => {
    const { getByText, queryByText } = render(
      <MonthPicker isOpen onClose={() => {}} testID="month" />
    );

    expect(getByText('Mei')).toBeTruthy();
    expect(getByText('Des')).toBeTruthy();
    expect(queryByText('May')).toBeNull();
  });

  it('labels months in English when language="en"', () => {
    const { getByText, queryByText } = render(
      <MonthPicker isOpen onClose={() => {}} testID="month" language="en" />
    );

    expect(getByText('May')).toBeTruthy();
    expect(getByText('Dec')).toBeTruthy();
    expect(queryByText('Mei')).toBeNull();
  });
});

describe('MonthPicker value', () => {
  it('highlights the month it was handed when it opens', () => {
    const { getByTestId } = render(
      <MonthPicker isOpen testID="month" value={[2]} onClose={() => {}} />
    );

    expect(isHighlighted(getByTestId('month-option-2'))).toBe(true);
    expect(isHighlighted(getByTestId('month-option-0'))).toBe(false);
  });

  it('highlights every month inside a handed range', () => {
    const { getByTestId } = render(
      <MonthPicker
        isOpen
        mode="range"
        testID="month"
        value={{ startDate: 1, endDate: 3 }}
        onClose={() => {}}
      />
    );

    [1, 2, 3].forEach((m) =>
      expect(isHighlighted(getByTestId(`month-option-${m}`))).toBe(true)
    );
    expect(isHighlighted(getByTestId('month-option-4'))).toBe(false);
  });

  it('highlights each month of a handed multiple selection', () => {
    const { getByTestId } = render(
      <MonthPicker
        isOpen
        mode="multiple"
        testID="month"
        value={[0, 5]}
        onClose={() => {}}
      />
    );

    expect(isHighlighted(getByTestId('month-option-0'))).toBe(true);
    expect(isHighlighted(getByTestId('month-option-5'))).toBe(true);
    expect(isHighlighted(getByTestId('month-option-1'))).toBe(false);
  });

  it('keeps a fresh tap over the value it was handed', () => {
    const { getByTestId, rerender } = render(
      <MonthPicker isOpen testID="month" value={[2]} onClose={() => {}} />
    );

    fireEvent.press(getByTestId('month-option-7'));
    // A re-render of the parent must not drag the sheet back to the old value.
    rerender(
      <MonthPicker isOpen testID="month" value={[2]} onClose={() => {}} />
    );

    expect(isHighlighted(getByTestId('month-option-7'))).toBe(true);
    expect(isHighlighted(getByTestId('month-option-2'))).toBe(false);
  });

  it('leaves its own selection alone when handed no value', () => {
    const { getByTestId, rerender } = render(
      <MonthPicker isOpen testID="month" onClose={() => {}} />
    );

    fireEvent.press(getByTestId('month-option-4'));
    rerender(<MonthPicker isOpen={false} testID="month" onClose={() => {}} />);
    rerender(<MonthPicker isOpen testID="month" onClose={() => {}} />);

    expect(isHighlighted(getByTestId('month-option-4'))).toBe(true);
  });

  it('clears the highlight when handed an empty value', () => {
    const { getByTestId, rerender } = render(
      <MonthPicker isOpen testID="month" value={[4]} onClose={() => {}} />
    );

    expect(isHighlighted(getByTestId('month-option-4'))).toBe(true);

    rerender(<MonthPicker isOpen testID="month" value={[]} onClose={() => {}} />); // prettier-ignore

    expect(isHighlighted(getByTestId('month-option-4'))).toBe(false);
  });
});

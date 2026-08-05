import { fireEvent, render } from '@testing-library/react-native';
import YearPicker from '../DatePicker/YearPicker';
import { isHighlighted } from './helpers/isHighlighted';

describe('YearPicker testID', () => {
  it('derives cancel, confirm and per-year option testIDs when open', () => {
    const currentYear = new Date().getFullYear();
    const { getByTestId } = render(
      <YearPicker testID="year" isOpen onClose={() => {}} />
    );

    expect(getByTestId('year-sheet')).toBeTruthy();
    expect(getByTestId('year-cancel')).toBeTruthy();
    expect(getByTestId('year-confirm')).toBeTruthy();
    expect(getByTestId(`year-option-${currentYear}`)).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(<YearPicker isOpen onClose={() => {}} />);

    expect(queryByTestId('undefined-sheet')).toBeNull();
    expect(queryByTestId('undefined-cancel')).toBeNull();
    expect(queryByTestId('undefined-confirm')).toBeNull();
  });
});

describe('YearPicker behaviour', () => {
  it('reports the picked year and closes on confirm', () => {
    const currentYear = new Date().getFullYear();
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <YearPicker isOpen testID="year" onChange={onChange} onClose={onClose} />
    );

    fireEvent.press(getByTestId(`year-option-${currentYear}`));
    fireEvent.press(getByTestId('year-confirm'));

    expect(onChange).toHaveBeenCalledWith([currentYear]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes without reporting anything on cancel', () => {
    const currentYear = new Date().getFullYear();
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <YearPicker isOpen testID="year" onChange={onChange} onClose={onClose} />
    );

    fireEvent.press(getByTestId(`year-option-${currentYear}`));
    fireEvent.press(getByTestId('year-cancel'));

    expect(onChange).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('YearPicker labels', () => {
  it('ships Indonesian defaults', () => {
    const { getByText } = render(
      <YearPicker isOpen testID="year" onClose={() => {}} />
    );

    expect(getByText('Pilih Tahun')).toBeTruthy();
    expect(getByText('Batal')).toBeTruthy();
    expect(getByText('Pilih')).toBeTruthy();
  });

  it('lets every static string be replaced', () => {
    const { getByText, queryByText } = render(
      <YearPicker
        isOpen
        testID="year"
        title="Choose a year"
        cancelLabel="Cancel"
        confirmLabel="Apply"
        onClose={() => {}}
      />
    );

    expect(getByText('Choose a year')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Apply')).toBeTruthy();
    expect(queryByText('Pilih Tahun')).toBeNull();
  });
});

describe('YearPicker value', () => {
  const currentYear = new Date().getFullYear();

  it('highlights the year it was handed when it opens', () => {
    const { getByTestId } = render(
      <YearPicker
        isOpen
        testID="year"
        value={[currentYear]}
        onClose={() => {}}
      />
    );

    expect(isHighlighted(getByTestId(`year-option-${currentYear}`))).toBe(true);
  });

  it('pages to the year it was handed', () => {
    const target = currentYear - 20;
    const { getByTestId } = render(
      <YearPicker isOpen testID="year" value={[target]} onClose={() => {}} />
    );

    // Two decades back is off the default page entirely; it has to turn to it.
    expect(isHighlighted(getByTestId(`year-option-${target}`))).toBe(true);
  });

  it('highlights every year inside a handed range', () => {
    const { getByTestId } = render(
      <YearPicker
        isOpen
        mode="range"
        testID="year"
        value={{ startDate: currentYear - 1, endDate: currentYear + 1 }}
        onClose={() => {}}
      />
    );

    [currentYear - 1, currentYear, currentYear + 1].forEach((y) =>
      expect(isHighlighted(getByTestId(`year-option-${y}`))).toBe(true)
    );
  });

  it('keeps a fresh tap over the value it was handed', () => {
    const props = { isOpen: true, testID: 'year', value: [currentYear] };
    const { getByTestId, rerender } = render(
      <YearPicker {...props} onClose={() => {}} />
    );

    fireEvent.press(getByTestId(`year-option-${currentYear + 1}`));
    rerender(<YearPicker {...props} onClose={() => {}} />);

    expect(isHighlighted(getByTestId(`year-option-${currentYear + 1}`))).toBe(
      true
    );
    expect(isHighlighted(getByTestId(`year-option-${currentYear}`))).toBe(
      false
    );
  });

  it('leaves its own selection alone when handed no value', () => {
    const { getByTestId, rerender } = render(
      <YearPicker isOpen testID="year" onClose={() => {}} />
    );

    fireEvent.press(getByTestId(`year-option-${currentYear}`));
    rerender(<YearPicker isOpen={false} testID="year" onClose={() => {}} />);
    rerender(<YearPicker isOpen testID="year" onClose={() => {}} />);

    expect(isHighlighted(getByTestId(`year-option-${currentYear}`))).toBe(true);
  });
});

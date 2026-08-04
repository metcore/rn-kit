import { fireEvent, render } from '@testing-library/react-native';
import InputMonth from '../Input/InputMonth';
import InputYear from '../Input/InputYear';

const currentYear = new Date().getFullYear();

describe('InputMonth testID', () => {
  it('derives label, trigger and sheet testIDs', () => {
    const { getByTestId } = render(
      <InputMonth testID="birth" label="Bulan lahir" placeholder="Pilih" />
    );

    expect(getByTestId('birth-label')).toBeTruthy();
    expect(getByTestId('birth-trigger')).toBeTruthy();

    fireEvent.press(getByTestId('birth-trigger'));
    expect(getByTestId('birth-sheet')).toBeTruthy();
  });

  it('derives the end trigger only in range mode', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <InputMonth testID="period" label="Periode" placeholder="Mulai" />
    );

    expect(queryByTestId('period-trigger-end')).toBeNull();

    rerender(
      <InputMonth
        testID="period"
        label="Periode"
        placeholder="Mulai"
        placeholderEnd="Selesai"
        mode="range"
      />
    );

    expect(getByTestId('period-trigger-end')).toBeTruthy();
  });

  it('derives the clear testID only once there is a value', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <InputMonth testID="birth" label="Bulan" placeholder="Pilih" hasClear />
    );

    expect(queryByTestId('birth-clear')).toBeNull();

    rerender(
      <InputMonth
        testID="birth"
        label="Bulan"
        placeholder="Pilih"
        hasClear
        value={1}
      />
    );

    expect(getByTestId('birth-clear')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(
      <InputMonth label="Bulan" placeholder="Pilih" hasClear value={1} />
    );

    expect(getByText('Bulan')).toBeTruthy();
    expect(queryByTestId('undefined-trigger')).toBeNull();
    expect(queryByTestId('undefined-label')).toBeNull();
    expect(queryByTestId('undefined-clear')).toBeNull();
  });
});

describe('InputMonth behaviour', () => {
  it('shows the placeholder until a value arrives', () => {
    const { getByText, queryByText, rerender } = render(
      <InputMonth testID="birth" label="Bulan" placeholder="Pilih bulan" />
    );

    expect(getByText('Pilih bulan')).toBeTruthy();

    rerender(
      <InputMonth
        testID="birth"
        label="Bulan"
        placeholder="Pilih bulan"
        value={1}
      />
    );

    expect(queryByText('Pilih bulan')).toBeNull();
  });

  it('spells the month in Indonesian by default', () => {
    const { getByText } = render(
      <InputMonth testID="birth" label="Bulan" placeholder="Pilih" value={1} />
    );

    expect(getByText('Januari')).toBeTruthy();
  });

  it('spells the month in English when asked', () => {
    const { getByText } = render(
      <InputMonth
        testID="birth"
        label="Bulan"
        placeholder="Pilih"
        value={1}
        language="en"
      />
    );

    expect(getByText('January')).toBeTruthy();
  });

  it('opens the picker and reports the month that was confirmed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <InputMonth
        testID="birth"
        label="Bulan"
        placeholder="Pilih"
        onChange={onChange}
      />
    );

    fireEvent.press(getByTestId('birth-trigger'));
    fireEvent.press(getByTestId('birth-option-2'));
    fireEvent.press(getByTestId('birth-confirm'));

    // option-2 is the third entry in the sheet; months are reported 1-based,
    // so March comes back as 3.
    expect(onChange).toHaveBeenCalledWith({
      value: 3,
      startValue: null,
      endValue: null,
    });
  });

  it('reports a null selection when cleared', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <InputMonth
        testID="birth"
        label="Bulan"
        placeholder="Pilih"
        hasClear
        value={5}
        onChange={onChange}
      />
    );

    fireEvent.press(getByTestId('birth-clear'));

    expect(onChange).toHaveBeenCalledWith({
      value: null,
      startValue: null,
      endValue: null,
    });
  });

  it('calls onSelectClick when the trigger is pressed', () => {
    const onSelectClick = jest.fn();
    const { getByTestId } = render(
      <InputMonth
        testID="birth"
        label="Bulan"
        placeholder="Pilih"
        onSelectClick={onSelectClick}
      />
    );

    fireEvent.press(getByTestId('birth-trigger'));

    expect(onSelectClick).toHaveBeenCalledTimes(1);
  });

  it('counts months from one, not from zero', () => {
    const { getByText, rerender } = render(
      <InputMonth testID="m" label="Bulan" placeholder="Pilih" value={1} />
    );
    expect(getByText('Januari')).toBeTruthy();

    rerender(
      <InputMonth testID="m" label="Bulan" placeholder="Pilih" value={12} />
    );
    expect(getByText('Desember')).toBeTruthy();
  });

  it('shows the placeholder for a month outside 1-12', () => {
    const { getByText } = render(
      <InputMonth
        testID="m"
        label="Bulan"
        placeholder="Pilih bulan"
        value={0}
      />
    );

    // 0 used to mean January; treating it as a month would silently show
    // December of the previous year.
    expect(getByText('Pilih bulan')).toBeTruthy();
  });

  it('reports both ends of a picked range one-based', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <InputMonth
        testID="p"
        mode="range"
        label="Periode"
        placeholder="Mulai"
        placeholderEnd="Selesai"
        onChange={onChange}
      />
    );

    fireEvent.press(getByTestId('p-trigger'));
    fireEvent.press(getByTestId('p-option-0'));
    fireEvent.press(getByTestId('p-option-5'));
    fireEvent.press(getByTestId('p-confirm'));

    expect(onChange).toHaveBeenLastCalledWith({
      value: null,
      startValue: 1,
      endValue: 6,
    });
  });

  it('shows both ends of a range', () => {
    const { getByText } = render(
      <InputMonth
        testID="period"
        label="Periode"
        placeholder="Mulai"
        placeholderEnd="Selesai"
        mode="range"
        value={1}
        valueEnd={12}
      />
    );

    expect(getByText('Januari')).toBeTruthy();
    expect(getByText('Desember')).toBeTruthy();
  });
});

describe('InputYear', () => {
  it('derives label, trigger and sheet testIDs', () => {
    const { getByTestId } = render(
      <InputYear testID="year" label="Tahun" placeholder="Pilih" />
    );

    expect(getByTestId('year-label')).toBeTruthy();

    fireEvent.press(getByTestId('year-trigger'));
    expect(getByTestId('year-sheet')).toBeTruthy();
  });

  it('shows the year as given, with no localisation to apply', () => {
    const { getByText } = render(
      <InputYear testID="year" label="Tahun" placeholder="Pilih" value={2024} />
    );

    expect(getByText('2024')).toBeTruthy();
  });

  it('opens the picker and reports the year that was confirmed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <InputYear
        testID="year"
        label="Tahun"
        placeholder="Pilih"
        onChange={onChange}
      />
    );

    fireEvent.press(getByTestId('year-trigger'));
    fireEvent.press(getByTestId(`year-option-${currentYear}`));
    fireEvent.press(getByTestId('year-confirm'));

    expect(onChange).toHaveBeenCalledWith({
      value: currentYear,
      startValue: null,
      endValue: null,
    });
  });

  it('reports a null selection when cleared', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <InputYear
        testID="year"
        label="Tahun"
        placeholder="Pilih"
        hasClear
        value={2024}
        onChange={onChange}
      />
    );

    fireEvent.press(getByTestId('year-clear'));

    expect(onChange).toHaveBeenCalledWith({
      value: null,
      startValue: null,
      endValue: null,
    });
  });

  it('renders no testID when the prop is omitted', () => {
    const { getByText, queryByTestId } = render(
      <InputYear label="Tahun" placeholder="Pilih" hasClear value={2024} />
    );

    expect(getByText('Tahun')).toBeTruthy();
    expect(queryByTestId('undefined-trigger')).toBeNull();
    expect(queryByTestId('undefined-clear')).toBeNull();
  });
});

describe('PickerField label', () => {
  it('drops the label element entirely when no label is given', () => {
    const { queryByTestId, getByTestId } = render(
      <InputMonth testID="m" placeholder="Pilih bulan" />
    );

    // Not an empty Typography sitting there taking up space -- gone.
    expect(queryByTestId('m-label')).toBeNull();
    expect(getByTestId('m-trigger')).toBeTruthy();
  });

  it('drops it for an empty string too', () => {
    const { queryByTestId } = render(
      <InputMonth testID="m" label="" placeholder="Pilih bulan" />
    );

    expect(queryByTestId('m-label')).toBeNull();
  });

  it('keeps the label element when there is one', () => {
    const { getByTestId, getByText } = render(
      <InputMonth testID="m" label="Bulan" placeholder="Pilih bulan" />
    );

    expect(getByTestId('m-label')).toBeTruthy();
    expect(getByText('Bulan')).toBeTruthy();
  });

  it('applies the same rule to InputYear', () => {
    const { queryByTestId } = render(
      <InputYear testID="y" placeholder="Pilih tahun" />
    );

    expect(queryByTestId('y-label')).toBeNull();
  });
});

describe('picker label passthrough', () => {
  const open = (tree: ReturnType<typeof render>, id: string) => {
    fireEvent.press(tree.getByTestId(`${id}-trigger`));
    return tree;
  };

  it('lets InputMonth restate the sheet title and buttons', () => {
    const tree = open(
      render(
        <InputMonth
          testID="m"
          label="Month"
          placeholder="Pick"
          title="Choose a month"
          cancelLabel="Cancel"
          confirmLabel="Apply"
        />
      ),
      'm'
    );

    expect(tree.getByText('Choose a month')).toBeTruthy();
    expect(tree.getByText('Cancel')).toBeTruthy();
    expect(tree.getByText('Apply')).toBeTruthy();
  });

  it('lets InputYear restate the sheet title and buttons', () => {
    const tree = open(
      render(
        <InputYear
          testID="y"
          label="Year"
          placeholder="Pick"
          title="Choose a year"
          cancelLabel="Cancel"
          confirmLabel="Apply"
        />
      ),
      'y'
    );

    expect(tree.getByText('Choose a year')).toBeTruthy();
    expect(tree.getByText('Cancel')).toBeTruthy();
    expect(tree.getByText('Apply')).toBeTruthy();
  });

  it('keeps the picker defaults when nothing is passed', () => {
    const tree = open(
      render(<InputYear testID="y" label="Tahun" placeholder="Pilih" />),
      'y'
    );

    expect(tree.getByText('Pilih Tahun')).toBeTruthy();
    expect(tree.getByText('Batal')).toBeTruthy();
  });
});

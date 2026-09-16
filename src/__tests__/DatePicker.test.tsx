import { fireEvent, render } from '@testing-library/react-native';
import Color from '../Color/Color';
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

describe('DatePicker marked dates', () => {
  const dayBackground = (getAllByText: any, label: string) => {
    let node = getAllByText(label)[0].parent;

    while (node) {
      const style = node.props?.style;
      const flat = Array.isArray(style)
        ? Object.assign({}, ...style.filter(Boolean))
        : style;

      if (flat?.backgroundColor) return flat.backgroundColor;

      node = node.parent;
    }

    return undefined;
  };

  const june = (day: number) => new Date(2026, 5, day);

  it('keeps showing the value as selected while the caller marks its own dates', () => {
    const { getAllByText } = render(
      <DatePicker
        isOpen
        mode="single"
        value={{ date: june(10) }}
        initialDate={june(10)}
        markedDates={{
          '2026-06-15': {
            selected: true,
            backgroundColor: '#fee2e2',
            textColor: '#ef4444',
          },
        }}
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(dayBackground(getAllByText, '10')).toBe(Color.primary[1000]);
    expect(dayBackground(getAllByText, '15')).toBe('#fee2e2');
  });

  it('paints the value in the selected colour even where the caller painted it', () => {
    const { getAllByText } = render(
      <DatePicker
        isOpen
        mode="single"
        value={{ date: june(10) }}
        initialDate={june(10)}
        markedDates={{
          '2026-06-10': {
            selected: true,
            backgroundColor: '#fee2e2',
            textColor: '#ef4444',
          },
        }}
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(dayBackground(getAllByText, '10')).toBe(Color.primary[1000]);
  });

  it('honours the selected colours the caller asked for', () => {
    const { getAllByText } = render(
      <DatePicker
        isOpen
        mode="single"
        value={{ date: june(10) }}
        initialDate={june(10)}
        selectedBackgroundColor="#0ea5e9"
        markedDates={{ '2026-06-10': { selected: true, dots: ['red'] } }}
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(dayBackground(getAllByText, '10')).toBe('#0ea5e9');
  });

  it('leaves the dots the caller put on the value alone', () => {
    const { UNSAFE_root } = render(
      <DatePicker
        isOpen
        mode="single"
        value={{ date: june(10) }}
        initialDate={june(10)}
        markedDates={{ '2026-06-10': { selected: true, dots: ['#ef4444'] } }}
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    const dots = UNSAFE_root.findAll((node: any) => {
      const style = node.props?.style;
      const flat = Array.isArray(style)
        ? Object.assign({}, ...style.filter(Boolean))
        : style;

      return (
        typeof node.type === 'string' && flat?.backgroundColor === '#ef4444'
      );
    });

    expect(dots.length).toBeGreaterThan(0);
  });

  it('moves the highlight onto the day the user taps', () => {
    const { getAllByText } = render(
      <DatePicker
        isOpen
        mode="single"
        value={{ date: june(10) }}
        initialDate={june(10)}
        markedDates={{
          '2026-06-15': {
            selected: true,
            backgroundColor: '#fee2e2',
            textColor: '#ef4444',
          },
        }}
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    fireEvent.press(getAllByText('15')[0]);

    expect(dayBackground(getAllByText, '15')).toBe(Color.primary[1000]);
    expect(dayBackground(getAllByText, '10')).not.toBe(Color.primary[1000]);
  });
});

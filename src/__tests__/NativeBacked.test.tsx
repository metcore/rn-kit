import { fireEvent, render } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import Calendar from '../Calendar/Calendar';
import Color from '../Color/Color';
import Drawing from '../Drawing/Drawing';
import PdfView from '../FileView/PdfView';
import TextEditor from '../TextEditor/TextEditor';

// Drawing, TextEditor and PdfView sit on native packages with no binary under
// jest. Their stand-ins live in <rootDir>/__mocks__ and jest applies them
// automatically for node_modules, so there is no jest.mock call here.
// Calendar is pure JS -- it needs no stub at all.

describe('PdfView', () => {
  const source = { uri: 'file://a.pdf' };

  it('applies the testID it was given', () => {
    const { getByTestId } = render(<PdfView testID="doc" source={source} />);

    expect(getByTestId('doc')).toBeTruthy();
  });

  it('keeps the testID on the placeholder when there is no source', () => {
    const { getByTestId } = render(
      // @ts-expect-error -- exercising the guard for a missing source
      <PdfView testID="doc" source={undefined} />
    );

    expect(getByTestId('doc')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { toJSON, queryByTestId } = render(<PdfView source={source} />);

    expect(toJSON()).toBeTruthy();
    expect(queryByTestId('doc')).toBeNull();
  });
});

describe('Drawing', () => {
  it('applies the testID it was given', () => {
    const { getByTestId } = render(<Drawing testID="signature" />);

    expect(getByTestId('signature')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { toJSON, queryByTestId } = render(<Drawing />);

    expect(toJSON()).toBeTruthy();
    expect(queryByTestId('signature')).toBeNull();
  });

  it('shows the hint it was given', () => {
    const { getByText } = render(
      <Drawing testID="signature" hint="Tanda tangan di kotak" />
    );

    expect(getByText('Tanda tangan di kotak')).toBeTruthy();
  });
});

describe('TextEditor', () => {
  it('applies the testID it was given', () => {
    const { getByTestId } = render(<TextEditor testID="editor" />);

    expect(getByTestId('editor')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { toJSON, queryByTestId } = render(<TextEditor />);

    expect(toJSON()).toBeTruthy();
    expect(queryByTestId('editor')).toBeNull();
  });

  it('shows its label and hint', () => {
    const { getByText } = render(
      <TextEditor testID="editor" label="Catatan" hint="Wajib diisi" />
    );

    expect(getByText('Catatan')).toBeTruthy();
    expect(getByText('Wajib diisi')).toBeTruthy();
  });
});

describe('Calendar', () => {
  it('applies the testID it was given', () => {
    const { getByTestId } = render(<Calendar testID="cal" />);

    expect(getByTestId('cal')).toBeTruthy();
  });

  it('renders no testID when the prop is omitted', () => {
    const { toJSON, queryByTestId } = render(<Calendar />);

    expect(toJSON()).toBeTruthy();
    expect(queryByTestId('cal')).toBeNull();
  });

  it('reports the tapped day in single mode', () => {
    const onChange = jest.fn();
    // Pinned so the grid does not depend on today's date.
    const { getByText } = render(
      <Calendar
        testID="cal"
        initialDate={new Date(2024, 0, 15)}
        onChange={onChange}
      />
    );

    fireEvent.press(getByText('10'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const [arg] = onChange.mock.calls[0]!;
    expect(arg.date).toBeInstanceOf(Date);
    expect(arg.date.getDate()).toBe(10);
  });

  it('builds a range from two taps in range mode', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Calendar
        testID="cal"
        mode="range"
        initialDate={new Date(2024, 0, 15)}
        onChange={onChange}
      />
    );

    fireEvent.press(getByText('10'));
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ endDate: null })
    );

    fireEvent.press(getByText('20'));
    const last = onChange.mock.calls.at(-1)![0];
    expect(last.startDate.getDate()).toBe(10);
    expect(last.endDate.getDate()).toBe(20);
  });
});

describe("Calendar today's date", () => {
  // Pinned so "today" is a known cell rather than whatever day the suite runs.
  const TODAY = new Date(2024, 0, 15);

  const colorOf = (node: { props: { style: unknown } }) =>
    (StyleSheet.flatten(node.props.style) as { color?: string }).color;

  beforeEach(() => {
    jest.setSystemTime(TODAY);
  });

  const renderCalendar = (props?: Record<string, unknown>) =>
    render(<Calendar testID="cal" initialDate={TODAY} {...props} />);

  it('marks today apart from the ordinary days', () => {
    const { getByText } = renderCalendar();

    expect(colorOf(getByText('15'))).toBe(Color.info[500]);
    expect(colorOf(getByText('16'))).toBe(Color.gray[700]);
  });

  it('lets a caller restyle it', () => {
    const { getByText } = renderCalendar({ todayTextColor: Color.orange[500] });

    expect(colorOf(getByText('15'))).toBe(Color.orange[500]);
  });

  // Today is a hint about which day it is, not a state of its own -- anything
  // the user or the caller actually decided has to win over it.
  it('yields to the selected day', () => {
    const { getByText } = renderCalendar();

    fireEvent.press(getByText('15'));

    expect(colorOf(getByText('15'))).toBe(Color.base.white100);
  });

  it('yields to a disabled day', () => {
    const { getByText } = renderCalendar({ minDate: new Date(2024, 0, 20) });

    expect(colorOf(getByText('15'))).toBe(Color.gray[400]);
  });

  it('yields to a marked day', () => {
    const { getByText } = renderCalendar({
      markedDates: {
        '2024-01-15': { selected: true, textColor: Color.danger[500] },
      },
    });

    expect(colorOf(getByText('15'))).toBe(Color.danger[500]);
  });

  // A range's start/end date can land on a day that's separately marked
  // (e.g. an off day in a work schedule preview) -- that marking is more
  // informative than the plain "this is the boundary" pin, so it wins.
  it('yields to a marked day even when it is the range start/end', () => {
    const { getByText } = renderCalendar({
      mode: 'range',
      dateStart: '2024-01-15',
      dateEnd: '2024-01-20',
      markedDates: {
        '2024-01-15': {
          selected: true,
          backgroundColor: Color.danger[50],
          textColor: Color.danger[500],
        },
      },
    });

    expect(colorOf(getByText('15'))).toBe(Color.danger[500]);
  });
});

import { fireEvent, render } from '@testing-library/react-native';
import Calendar from '../Calendar/Calendar';
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

import { fireEvent, render, screen } from '@testing-library/react-native';
import Calendar from '../Calendar/Calendar';
import DatePicker from '../DatePicker/DatePicker';

const january = new Date(2026, 0, 1);

describe('Calendar disabledDates', () => {
  it('blocks a date listed in disabledDates', () => {
    const onChange = jest.fn();

    render(
      <Calendar
        mode="single"
        initialDate={january}
        disabledDates={['2026-01-15']}
        onChange={onChange}
      />
    );

    fireEvent.press(screen.getByText('15'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('still allows a date that is not listed', () => {
    const onChange = jest.fn();

    render(
      <Calendar
        mode="single"
        initialDate={january}
        disabledDates={['2026-01-15']}
        onChange={onChange}
      />
    );

    fireEvent.press(screen.getByText('16'));

    expect(onChange).toHaveBeenCalled();
  });

  it('accepts Date objects as well as strings', () => {
    const onChange = jest.fn();

    render(
      <Calendar
        mode="single"
        initialDate={january}
        disabledDates={[new Date(2026, 0, 15)]}
        onChange={onChange}
      />
    );

    fireEvent.press(screen.getByText('15'));

    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('DatePicker with disabledDates', () => {
  it('keeps highlighting the chosen date', () => {
    render(
      <DatePicker
        isOpen
        mode="single"
        initialDate={january}
        value={{ date: new Date(2026, 0, 15) }}
        disabledDates={['2026-01-20']}
        onClose={() => {}}
        onChange={() => {}}
      />
    );

    expect(screen.getByText('15').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: '#FFFFFF' })])
    );
  });
});

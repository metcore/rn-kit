import { fireEvent, render } from '@testing-library/react-native';
import TimePicker from '../DatePicker/TimePicker';

describe('TimePicker testID', () => {
  it('derives cancel, confirm, hour and minute testIDs when open', () => {
    const { getByTestId } = render(
      <TimePicker testID="time" isOpen onClose={() => {}} />
    );

    expect(getByTestId('time-sheet')).toBeTruthy();
    expect(getByTestId('time-cancel')).toBeTruthy();
    expect(getByTestId('time-confirm')).toBeTruthy();
    expect(getByTestId('time-hour')).toBeTruthy();
    expect(getByTestId('time-minute')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(<TimePicker isOpen onClose={() => {}} />);

    expect(queryByTestId('undefined-sheet')).toBeNull();
    expect(queryByTestId('undefined-cancel')).toBeNull();
    expect(queryByTestId('undefined-confirm')).toBeNull();
  });
});

describe('TimePicker behaviour', () => {
  it('reports the seeded time and closes on confirm', () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <TimePicker
        isOpen
        testID="time"
        value={{ hour: 9, minute: 30 }}
        onChange={onChange}
        onClose={onClose}
      />
    );

    fireEvent.press(getByTestId('time-confirm'));

    expect(onChange).toHaveBeenCalledWith({ hour: 9, minute: 30 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes without reporting anything on cancel', () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const { getByTestId } = render(
      <TimePicker
        isOpen
        testID="time"
        value={{ hour: 9, minute: 30 }}
        onChange={onChange}
        onClose={onClose}
      />
    );

    fireEvent.press(getByTestId('time-cancel'));

    expect(onChange).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

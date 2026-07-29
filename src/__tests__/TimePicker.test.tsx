import { render } from '@testing-library/react-native';
import TimePicker from '../DatePicker/TimePicker';

describe('TimePicker testID', () => {
  it('derives cancel, confirm, hour and minute testIDs when open', () => {
    const { getByTestId } = render(
      <TimePicker testID="time" isOpen onClose={() => {}} />
    );

    expect(getByTestId('time-cancel')).toBeTruthy();
    expect(getByTestId('time-confirm')).toBeTruthy();
    expect(getByTestId('time-hour')).toBeTruthy();
    expect(getByTestId('time-minute')).toBeTruthy();
  });

  it('renders no testID when prop omitted', () => {
    const { queryByTestId } = render(<TimePicker isOpen onClose={() => {}} />);

    expect(queryByTestId('undefined-cancel')).toBeNull();
    expect(queryByTestId('undefined-confirm')).toBeNull();
  });
});

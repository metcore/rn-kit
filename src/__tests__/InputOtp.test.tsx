import { fireEvent, render } from '@testing-library/react-native';
import InputOtp from '../Input/InputOtp';

describe('InputOtp testID', () => {
  it('derives per-digit, label, and error testIDs', () => {
    const { getByTestId } = render(
      <InputOtp testID="otp" label="Code" hint="required" length={4} />
    );
    expect(getByTestId('otp-item-0')).toBeTruthy();
    expect(getByTestId('otp-item-3')).toBeTruthy();
    expect(getByTestId('otp-label')).toBeTruthy();
    expect(getByTestId('otp-error')).toBeTruthy();
  });

  it('renders no testID when omitted', () => {
    const { queryByTestId } = render(
      <InputOtp label="Code" hint="required" length={4} />
    );
    expect(queryByTestId('otp-item-0')).toBeNull();
    expect(queryByTestId('otp-label')).toBeNull();
    expect(queryByTestId('otp-error')).toBeNull();
  });
});

describe('InputOtp behaviour', () => {
  it('reports the digits joined across every box', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <InputOtp testID="otp" length={4} onChange={onChange} />
    );

    fireEvent.changeText(getByTestId('otp-item-0'), '1');
    expect(onChange).toHaveBeenLastCalledWith('1');

    fireEvent.changeText(getByTestId('otp-item-1'), '2');
    expect(onChange).toHaveBeenLastCalledWith('12');

    fireEvent.changeText(getByTestId('otp-item-3'), '4');
    // box 2 is still empty, so it contributes nothing to the join
    expect(onChange).toHaveBeenLastCalledWith('124');
  });

  it('drops a digit back out of the value when its box is emptied', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <InputOtp testID="otp" length={3} onChange={onChange} />
    );

    fireEvent.changeText(getByTestId('otp-item-0'), '7');
    fireEvent.changeText(getByTestId('otp-item-1'), '8');
    expect(onChange).toHaveBeenLastCalledWith('78');

    fireEvent.changeText(getByTestId('otp-item-0'), '');
    expect(onChange).toHaveBeenLastCalledWith('8');
  });

  it('renders one box per length', () => {
    const { getByTestId, queryByTestId } = render(
      <InputOtp testID="otp" length={4} />
    );

    expect(getByTestId('otp-item-3')).toBeTruthy();
    expect(queryByTestId('otp-item-4')).toBeNull();
  });
});

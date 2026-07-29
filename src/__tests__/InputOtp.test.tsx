import { render } from '@testing-library/react-native';
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

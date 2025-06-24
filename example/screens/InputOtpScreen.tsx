import { Container, InputOtp } from '@herca/rn-kit';

export default function InputOtpScreen() {
  return (
    <Container>
      <InputOtp label="Put your otp" hint="Put your OTP" />
      <InputOtp
        label="Put your otp"
        hint="OTP tidak valid, Silahkan periksa kode dan coba lagi."
        hasError={true}
      />
    </Container>
  );
}

import { useState } from 'react';
import { Color, InputOtp, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function InputOtpScreen() {
  const [otp, setOtp] = useState('');

  return (
    <DemoScreen
      title="Input OTP"
      description="Kotak input terpisah untuk kode one-time password, fokus berpindah otomatis antar kotak saat mengetik."
    >
      <DemoSection
        title="Dasar"
        note="Tanpa prop length, komponen menampilkan 6 kotak input secara default."
      >
        <InputOtp label="Kode verifikasi" hint="Cek SMS untuk kode OTP" />
      </DemoSection>

      <DemoSection
        title="Panjang kustom"
        note="length mengatur jumlah kotak input sesuai panjang kode OTP."
      >
        <DemoLabel text="length={4}" />
        <InputOtp label="PIN transaksi" length={4} />
      </DemoSection>

      <DemoSection
        title="Error"
        note="hasError mengubah border kotak jadi merah untuk menandai kode yang salah."
      >
        <DemoLabel text="hasError" />
        <InputOtp
          label="Kode verifikasi"
          hint="OTP tidak valid, silakan periksa kode dan coba lagi"
          hasError
        />
      </DemoSection>

      <DemoSection
        title="Controlled + fokus"
        note="Komponen menyimpan isi tiap kotak secara internal (ref); onChange melaporkan gabungan nilainya ke parent untuk readout. Tidak ada prop autoFocus bawaan — fokus awal butuh ref manual bila diperlukan."
      >
        <InputOtp label="Kode verifikasi" onChange={setOtp} />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Nilai: ${otp || '-'}`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

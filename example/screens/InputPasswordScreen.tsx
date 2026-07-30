import { useState } from 'react';
import { Color, InputPassword, Typography } from '@herca/rn-kit';
import { DemoScreen, DemoSection, DemoLabel } from '../components/demo';

export default function InputPasswordScreen() {
  const [password, setPassword] = useState('');

  return (
    <DemoScreen
      title="Input Password"
      description="Varian Input khusus kata sandi: teks otomatis disamarkan dengan tombol mata bawaan untuk menampilkan/menyembunyikan."
    >
      <DemoSection
        title="Dasar"
        note="Semua props Input (icon, clearButton, hint, dst.) tetap berlaku karena InputPassword adalah pembungkus Input."
      >
        <InputPassword
          icon="lock-fill"
          label="Kata sandi"
          placeholder="Tulis kata sandi"
          clearButton
        />
      </DemoSection>

      <DemoSection
        title="Toggle lihat sandi"
        note="Ikon kanan (mata) dan togglenya sudah bawaan komponen; iconRight/onPressIconRight tidak perlu diatur manual."
      >
        <DemoLabel text="tekan ikon mata untuk toggle" />
        <InputPassword
          icon="lock-fill"
          label="Kata sandi baru"
          placeholder="Minimal 8 karakter"
        />
      </DemoSection>

      <DemoSection
        title="Error & hint"
        note="hasError dan hint bekerja sama seperti pada Input biasa."
      >
        <DemoLabel text="hasError hint" />
        <InputPassword
          icon="lock-fill"
          label="Konfirmasi kata sandi"
          placeholder="Ulangi kata sandi"
          hasError
          hint="Kata sandi tidak cocok"
        />
      </DemoSection>

      <DemoSection
        title="Controlled"
        note="value + onChangeText mengontrol isi dari state; readout di bawah menghitung panjang karakternya."
      >
        <InputPassword
          icon="lock-fill"
          label="Kata sandi"
          placeholder="Tulis kata sandi"
          value={password}
          onChangeText={setPassword}
        />
        <Typography variant="t3" color={Color.gray[700]}>
          {`Panjang: ${password.length} karakter`}
        </Typography>
      </DemoSection>
    </DemoScreen>
  );
}

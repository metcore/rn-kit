# InputOtp Component

`InputOtp` adalah komponen React Native untuk input kode OTP (One-Time Password) dengan tampilan kotak-kotak input terpisah. Komponen ini responsif dan otomatis menyesuaikan ukuran input berdasarkan lebar container agar tampil rapi di berbagai ukuran layar.

---

## Fitur

- Menampilkan sejumlah input kotak sesuai panjang OTP (`length`).
- Input numeric 1 karakter per kotak.
- Fokus otomatis berpindah ke kotak berikutnya saat input.
- Fokus kembali ke kotak sebelumnya saat tekan backspace pada kotak kosong.
- Responsif: menggunakan lebar statis jika cukup ruang, atau `flexGrow` jika ruang terbatas.
- Label dan hint opsional.
- Warna border berubah saat error (`hasError`).

---

## Instalasi

Salin file `InputOtp.tsx` ke proyek React Native Anda dan import sesuai kebutuhan.

---

## Props

| Nama          | Tipe                    | Default | Deskripsi                                                                                |
| ------------- | ----------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `length`      | `number`                | 6       | Jumlah kotak input OTP yang ingin ditampilkan                                            |
| `onChange`    | `(otp: string) => void` | -       | Callback saat isi OTP berubah, menerima OTP lengkap sebagai string                       |
| `label`       | `string`                | -       | Label yang tampil di atas kotak input                                                    |
| `hint`        | `string`                | -       | Pesan kecil di bawah input (misal instruksi atau error)                                  |
| `hasError`    | `boolean`               | false   | Jika `true`, border input berubah warna merah (indikasi error)                           |
| `inputCenter` | `boolean`               | false   | Jika `true`, maka seluruh input field akan memposisikan diri ke tengah secara horizontal |

---

## Contoh Penggunaan

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import InputOtp from './InputOtp';

export default function OtpVerificationScreen() {
  const [otp, setOtp] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <InputOtp
        length={6}
        label="Masukkan Kode OTP"
        hint="Kode akan dikirim via SMS"
        hasError={otp.length < 6}
        onChange={setOtp}
      />
    </View>
  );
}
```

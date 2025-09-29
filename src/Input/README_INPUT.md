# 📥 Input Component

Komponen `Input` ini adalah komponen input teks yang dapat dikustomisasi dengan label, ikon, tombol clear, dan tampilan error. Dibangun menggunakan React Native.

---

## 🔧 Props

| Prop               | Tipe                      | Deskripsi                                                              |
| ------------------ | ------------------------- | ---------------------------------------------------------------------- |
| `label`            | `string`                  | Label yang ditampilkan di atas input                                   |
| `value`            | `string`                  | Nilai dari input (kontrol dari luar)                                   |
| `onChange`         | `(value: string) => void` | Fungsi yang dipanggil saat nilai berubah                               |
| `icon`             | `string`                  | Nama ikon (kiri) dari library `Icon`                                   |
| `iconRight`        | `string`                  | Nama ikon kanan dari library `Icon`                                    |
| `clearButton`      | `boolean`                 | Menampilkan tombol `x` untuk menghapus input                           |
| `hasError`         | `boolean`                 | Menandai input error, border akan berubah merah                        |
| `hint`             | `string`                  | Menampilkan teks kecil di bawah input, bisa untuk error atau petunjuk  |
| `onPressIconLeft`  | `() => void`              | Fungsi saat ikon kiri diklik                                           |
| `onPressIconRight` | `() => void`              | Fungsi saat ikon kanan diklik                                          |
| `secureTextEntry`  | `boolean`                 | Jika `true`, menyembunyikan input (untuk password)                     |
| `style`            | `ViewStyle`               | Style tambahan untuk input                                             |
| `prefix`           | `React.ReactNode`         | Slot `react node` yang bisa diisi oleh seluruh komponen react          |
| `required`         | `boolean`                 | Jika `true` maka akan menampilkan bintang berwarna merah setelah label |
| `...rest`          | `TextInputProps`          | Props lain dari React Native `TextInput`                               |

---

## 🧪 Contoh Penggunaan

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import Input from './Input';

export default function MyForm() {
  const [text, setText] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <Input
        label="Nama Pengguna"
        value={text}
        onChange={setText}
        icon="user"
        iconRight="eye"
        onPressIconRight={() => alert('Lihat password')}
        clearButton
        hint="Masukkan nama lengkap Anda"
      />
    </View>
  );
}
```

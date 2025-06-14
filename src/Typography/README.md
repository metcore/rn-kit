# ✍️ Typography Component

Komponen `Typography` digunakan untuk menampilkan teks dengan berbagai ukuran, ketebalan, warna, dan perataan yang telah ditentukan.

## ✨ Fitur

- Mendukung berbagai varian teks (heading, paragraph, text kecil)
- Dapat mengatur ketebalan teks (*weight*)
- Mendukung warna kustom
- Dukungan perataan: kiri, kanan, tengah
- Mendukung pemotongan teks (`numberOfLines`)

## 🧱 Props

| Prop           | Tipe                          | Default     | Deskripsi                                                       |
|----------------|-------------------------------|-------------|------------------------------------------------------------------|
| `children`     | `React.ReactNode`             | -           | Isi teks yang akan ditampilkan                                  |
| `variant`      | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'p1' \| 'p2' \| 'p3' \| 't1' \| 't2' \| 't3'` | `'p3'` | Ukuran dan gaya teks                                            |
| `weight`       | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | `'regular'` | Ketebalan huruf                                                 |
| `color`        | `ColorValue`                  | `'default'` | Warna teks                                                      |
| `style`        | `ViewStyle`                   | `undefined` | Gaya tambahan                                                   |
| `numberOfLines`| `number`                      | `undefined` | Jumlah maksimal baris teks ditampilkan                          |
| `center`       | `boolean`                     | `false`     | Mengatur teks ke tengah                                         |
| `right`        | `boolean`                     | `false`     | Mengatur teks ke kanan                                          |
| `left`         | `boolean`                     | `false`     | Mengatur teks ke kiri                                           |

## 🔠 Varian & Ukuran

| Variant | Font Size | Line Height |
|---------|-----------|-------------|
| h1      | 36        | 46          |
| h2      | 32        | 42          |
| h3      | 28        | 38          |
| h4      | 24        | 34          |
| p1      | 20        | 30          |
| p2      | 18        | 28          |
| p3      | 16        | 26          |
| t1      | 14        | 14          |
| t2      | 12        | 14          |
| t3      | 10        | 14          |

## 🧪 Contoh Penggunaan

```tsx
import React from 'react';
import Typography from './Typography'; // sesuaikan path

export default function Example() {
  return (
    <>
      <Typography variant="h1" weight="bold" center>
        Judul Utama
      </Typography>

      <Typography variant="p2" color="gray" numberOfLines={2}>
        Ini adalah deskripsi yang akan terpotong jika melebihi dua baris.
      </Typography>
    </>
  );
}
```

## 🗂️ Struktur File

```
Typography.tsx
├── Color/
├── type.ts (berisi TypographyVariantProps)
```

Pastikan untuk menyesuaikan `Color` dan `type.ts` agar mendukung struktur tema Anda.
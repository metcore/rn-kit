# 🧑‍🎨 Avatar Component

Komponen `Avatar` digunakan untuk menampilkan foto pengguna atau inisial nama jika foto tidak tersedia.
<img src="../../assets/doc/Avatar/Avatar.png" width=200>

## ✨ Fitur

- Menampilkan gambar avatar dari `Image source`
- Menampilkan inisial nama jika gambar tidak tersedia
- Mendukung tiga ukuran: kecil, sedang, besar
- Warna latar dan teks dapat dikustomisasi

## 🧱 Props

| Prop            | Tipe                    | Default     | Deskripsi                                                               |
|-----------------|-------------------------|-------------|-------------------------------------------------------------------------|
| `size`          | `'small'` \| `'medium'` \| `'large'` | `'medium'` | Ukuran avatar                                                          |
| `source`        | `ImageSourcePropType`   | `undefined` | Sumber gambar avatar                                                   |
| `name`          | `string`                | `undefined` | Digunakan untuk menampilkan inisial jika `source` tidak tersedia       |
| `backgroundColor` | `string`              | `'#ccc'`    | Warna latar belakang jika tanpa gambar                                 |
| `textColor`     | `string`                | `'#fff'`    | Warna teks inisial jika tanpa gambar                                   |
| `style`         | `ViewStyle`             | `undefined` | Gaya tambahan untuk container                                          |

## 📏 Ukuran Avatar

| Ukuran  | Nilai pixel |
|---------|-------------|
| small   | 30          |
| medium  | 40          |
| large   | 50          |

## 🧪 Contoh Penggunaan

```tsx
import React from 'react';
import Avatar from './Avatar'; // sesuaikan path

export default function ProfileHeader() {
  return (
    <>
      {/* Dengan gambar */}
      <Avatar
        size="large"
        source={{ uri: 'https://example.com/profile.jpg' }}
      />

      {/* Tanpa gambar, menggunakan nama */}
      <Avatar
        size="medium"
        name="SR"
        backgroundColor="#1E88E5"
        textColor="#fff"
      />
    </>
  );
}
```
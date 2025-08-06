# 🦴 Skeleton Loader Component

Komponen `Skeleton` adalah placeholder UI yang menampilkan efek shimmer animasi, berguna untuk memberikan feedback loading saat data belum tersedia.

---

## 📦 Props

| Prop              | Tipe             | Default                      | Deskripsi                                                                          |
| ----------------- | ---------------- | ---------------------------- | ---------------------------------------------------------------------------------- |
| `width`           | `DimensionValue` | `"100%"`                     | Lebar dari skeleton block. Bisa berupa angka atau string (`'100%'`, `'50%'`, dsb). |
| `height`          | `DimensionValue` | `50`                         | Tinggi dari skeleton block.                                                        |
| `rounded`         | `number`         | `8`                          | Radius border untuk membuat sudut membulat.                                        |
| `backgroundColor` | `string`         | `"#F0F0F0"`                  | Warna latar belakang dari blok skeleton.                                           |
| `shimmerColor`    | `string`         | `"rgba(255, 255, 255, 0.7)"` | Warna efek shimmer yang bergerak.                                                  |
| `duration`        | `number`         | `1500`                       | Durasi animasi shimmer (dalam milidetik).                                          |

---

## 🧠 Cara Kerja

- Komponen menggunakan `Animated.Value` untuk menggerakkan efek shimmer dari kiri ke kanan secara loop.
- Lebar shimmer dihitung berdasarkan lebar aktual komponen yang didapat dari event `onLayout`.
- Shimmer bergerak dengan `translateX` menggunakan `interpolate()` untuk efek linear mulus.

---

## 📌 Contoh Penggunaan

```tsx
import React from 'react';
import { View } from 'react-native';
import Skeleton from './components/Skeleton';

const MyLoadingScreen = () => {
  return (
    <View style={{ padding: 16 }}>
      <Skeleton height={20} width="60%" />
      <View style={{ height: 16 }} />
      <Skeleton height={20} width="80%" />
      <View style={{ height: 16 }} />
      <Skeleton height={100} width="100%" rounded={12} />
    </View>
  );
};
```

---

## 🧱 Struktur Rendered

```tsx
<View>
  {' '}
  // container
  <Animated.View /> // shimmer yang bergerak horizontal
</View>
```

---

## ⚠️ Catatan

- Komponen ini **tidak menerima children**, hanya untuk placeholder visual.
- Efek shimmer akan selalu berjalan secara loop selama komponen hidup.
- Perhatikan performa jika digunakan secara masif di satu halaman.

---

## 🛠 Tips

- Gunakan `Skeleton` dalam daftar (list, table, card) untuk meningkatkan UX saat loading.
- Dapat digabungkan dengan kondisi seperti:

```tsx
{
  isLoading ? <Skeleton height={50} /> : <ActualComponent data={data} />;
}
```

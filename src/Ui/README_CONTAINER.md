# 📦 Container
Komponen Container adalah pembungkus layout umum yang memberikan padding horizontal dan vertikal secara konsisten untuk konten di dalamnya. Cocok digunakan untuk membungkus seluruh tampilan atau bagian utama dari layar.

## 📐 Contoh Penggunaan

```tsx
import React from 'react';
import { Text } from 'react-native';
import Container from '@herca/rn-kit/Container';

export default function HomeScreen() {
  return (
    <Container>
      <Text>Selamat datang di aplikasi kami!</Text>
    </Container>
  );
}


```

## props
| Prop       | Tipe                   | Wajib | Default | Deskripsi                                                    |
| ---------- | ---------------------- | ----- | ------- | ------------------------------------------------------------ |
| `children` | `ReactNode`            | ✅     | -       | Komponen atau tampilan yang dibungkus di dalam container.    |
| `style`    | `StyleProp<ViewStyle>` | ❌     | -       | Tambahan gaya jika ingin menimpa atau menambah gaya default. |

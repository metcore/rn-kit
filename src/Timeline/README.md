# 🗂️ Timeline & TimelineItem

Timeline menampilkan rangkaian peristiwa secara vertikal—mirip “stepper” atau “activity feed”.
Setiap node diwakili oleh TimelineItem yang menampilkan titik (bullet icon) dan garis vertikal terhubung.

## Contoh Penggunaan

```tsx
import React from 'react';
import { Text } from 'react-native';
import Timeline from '@herca/rn-kit/Timeline';
import TimelineItem from '@herca/rn-kit/Timeline/TimelineItem';

export default function OrderHistory() {
  return (
    <Timeline>
      <TimelineItem color="success">
        <Text>Pesanan dibuat • 10 Jan 2025</Text>
      </TimelineItem>

      <TimelineItem color="primary">
        <Text>Dikemas • 11 Jan 2025</Text>
      </TimelineItem>

      <TimelineItem color="warning">
        <Text>Dalam pengiriman • 12 Jan 2025</Text>
      </TimelineItem>

      <TimelineItem color="danger">
        <Text>Gagal diterima • 14 Jan 2025</Text>
      </TimelineItem>
    </Timeline>
  );
}
```

## Props

### Timeline

| Prop       | Type        | Wajib | Default | Deskripsi                          |
| ---------- | ----------- | ----- | ------- | ---------------------------------- |
| `children` | `ReactNode` | ✅    | —       | Satu atau beberapa `TimelineItem`. |

### TimelineItem

| Prop       | Type                                                          | Wajib | Default     | Deskripsi                                                        |
| ---------- | ------------------------------------------------------------- | ----- | ----------- | ---------------------------------------------------------------- |
| `children` | `ReactNode`                                                   | ✅    | —           | Konten untuk node timeline: teks, ikon tambahan, dsb.            |
| `color`    | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'purple'` | ❌    | `'primary'` | Skema warna titik (`RadioButton`) dan garis vertikal.            |
| `isLast`   | `boolean`                                                     | ❌    | `false`     | Menentukan apakah garis garis di kiri itu dimunculkan atau tidak |

## ⚙️ Cara Kerja

1. Bullet & Line
   - Bullet dirender dengan komponen Icon (name="RadioButton") memakai warna dari color.

   - Garis vertikal (borderLeftWidth: 1) menggunakan borderStyle: 'dashed'. Tingginya dihitung secara dinamis (contentHeight - 20) agar garis mulai tepat di bawah bullet.

2. Penghitungan Tinggi
   - onLayout pada wrapper konten mengukur tinggi aktual item.

   - Hasil pengukuran dipakai untuk menyesuaikan panjang garis, menjaga visual konsisten meskipun konten memiliki tinggi berbeda.

3. Layout
   - Komponen dibangun dengan flexDirection: 'row', bullet di kiri, konten di kanan (flex: 1).

   - Margin horizontal (marginRight: 8) menjaga jarak antara bullet dan konten.

## 💡 Tips Penggunaan

- Item Terakhir Tanpa Garis
  Bila ingin menghilangkan garis pada item terakhir, buat prop opsional mis. isLast dan kondisikan tinggi garis menjadi 0.

- Interaktif
  Anda bebas menambahkan tombol, TouchableOpacity, atau ikon status di dalam children.

- Kustomisasi Warna
  Untuk warna tambahan, update COLOR_MAP dan tipe ColorKey pada TimelineItem.

# 🪜 Step & StepItem
Komponen Step menampilkan alur proses bertahap (wizard / progress indicator) dengan header horizontal yang dapat digeser, serta area konten untuk setiap langkah.
Setiap titik/langkah diwakili oleh StepItem.

## 📦 Contoh Penggunaan

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Step from '@herca/rn-kit/Step';
import StepItem from '@herca/rn-kit/Step/StepItem';

export default function CheckoutWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Step current={currentStep} onChangeStep={(i) => setCurrentStep(i)}>
      {/* Header & konten otomatis dipasangkan berdasarkan urutan */}
      <StepItem title="Alamat">
        <Text>Form Alamat Pengiriman</Text>
      </StepItem>

      <StepItem title="Pembayaran">
        <Text>Metode Pembayaran</Text>
      </StepItem>

      <StepItem title="Konfirmasi">
        <Text>Ringkasan & Konfirmasi Pesanan</Text>
      </StepItem>
    </Step>
  );
}

```
## 🧩 API Reference

### Step 
| Prop           | Type                                   | Wajib | Default | Deskripsi                                                                   |
| -------------- | -------------------------------------- | ----- | ------- | --------------------------------------------------------------------------- |
| `children`     | `ReactElement<StepItemProps>` \| array | ✅     | —       | Satu atau beberapa `StepItem`.                                              |
| `current`      | `number`                               | ✅     | —       | Indeks langkah aktif (dimulai dari `0`).                                    |
| `onChangeStep` | `(activeIndex: number) => void`        | ✅     | —       | Callback yang dipicu setiap kali nilai `current` berubah di dalam komponen. |
| `testID`       | `string`                               | ❌     | —       | ID untuk automation testing (Maestro/Detox/Appium). Diterapkan langsung ke elemen akar, tanpa suffix. |


### StepItem

Digunakan dua kali:

Sebagai header (ikon lingkaran + garis) – otomatis di‐render oleh Step.

Sebagai konten – ditampilkan bila index-nya sama dengan current.

| Prop       | Type                                                          | Wajib | Default     | Deskripsi                                                          |
| ---------- | ------------------------------------------------------------- | ----- | ----------- | ------------------------------------------------------------------ |
| `children` | `ReactNode`                                                   | ✅     | —           | Konten yang muncul ketika langkah ini aktif.                       |
| `color`    | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'purple'` | ❌     | `'primary'` | Warna lingkaran & garis pada header.                               |
| `title`    | `string`                                                      | ❌     | `''`        | (Opsional) Judul untuk ditampilkan di header (bisa dikustom lagi). |
| `testID`   | `string`                                                      | ❌     | —           | ID untuk automation testing (Maestro/Detox/Appium). Diterapkan langsung ke elemen akar, tanpa suffix. |

## ⚙️ Cara Kerja

1. Header Scrollable

    - Lebar setiap header item fix (stepWidth = 100).

    - Jika total lebar < perangkat, item otomatis di-center; jika lebih, bisa digeser horizontal.

    - Ketika current berubah, ScrollView.scrollTo() memastikan item aktif selalu di tengah layar.

2. Lingkaran Status

    - isActive → lingkaran berwarna solid (Color.info[500]).

    - isCompleted (index < current) → gaya sama dengan aktif (bisa diubah jika ingin beda).

    - Item terakhir otomatis tanpa garis setelah lingkaran.

3. Konten

    - Hanya langkah aktif yang dirender di area konten (childrenArray[current]).

    - Jika konten berupa FlatList, properti nestedScrollEnabled diaktifkan agar scrolling mulus di nested list.

## 💡 Tips & Praktik Terbaik

| Kebutuhan                 | Saran Implementasi                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Navigasi Manual**       | Ubah state `current` dari luar (`setCurrentStep`).                                                  |
| **Validasi Tiap Langkah** | Jalankan pengecekan sebelum menaikkan `current`; mis. pastikan form valid.                          |
| **Kustom Warna/Ikon**     | Edit `COLOR_MAP` atau tambahkan prop `icon` pada `StepItem` jika ingin ikon berbeda di bullet.      |
| **Langkah Dinamis**       | Karena `children` berupa array, Anda bisa `.filter()` atau `.slice()` sebelum mem-pass ke `<Step>`. |
| **Tema Gelap**            | Sesuaikan `Color.info[500]`, `Color.info[50]`, dll.                                                 |

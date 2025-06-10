# 📆 Komponen Kalender Kustom (React Native)

Komponen kalender ini dibuat menggunakan React Native dan memungkinkan pengguna untuk memilih tanggal tunggal maupun rentang tanggal, serta mendukung fitur penandaan dan pembatasan tanggal.

---

## 🚀 Fitur Utama

- Tampilan kalender bulanan
- Pilihan mode: tanggal tunggal (`single`) atau rentang tanggal (`range`)
- Menandai tanggal dengan warna atau indikator
- Menonaktifkan tanggal tertentu atau hari-hari tertentu (misalnya hanya aktif Senin–Jumat)
- Navigasi antar bulan
- Batas minimum dan maksimum tanggal yang bisa dipilih

---

## 🧩 Props (Properti)

| Prop                      | Tipe Data                              | Nilai Contoh / Opsi                                   | Keterangan                                                |
| ------------------------- | -------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `mode`                    | `'single'` \| `'range'`                | `'single'` (default), `'range'`                       | Menentukan apakah memilih 1 tanggal atau rentang tanggal  |
| `markedDates`             | `object`                               | `{ '2025-06-10': { marked: true, dotColor: 'red' } }` | Untuk menandai tanggal tertentu                           |
| `disabledDates`           | `string[]`                             | `['2025-06-10', '2025-06-11']`                        | Tanggal yang tidak bisa dipilih                           |
| `disabledDays`            | `{ [key: number]: boolean }`           | `{ 0: true, 6: true }`                                | Menonaktifkan hari dalam seminggu (0 = Minggu, 6 = Sabtu) |
| `minDate`                 | `Date`                                 | `new Date(2025, 5, 1)`                                | Tanggal paling awal yang bisa dipilih                     |
| `maxDate`                 | `Date`                                 | `new Date(2025, 5, 30)`                               | Tanggal paling akhir yang bisa dipilih                    |
| `onChange`                | `(date: Date \| [Date, Date]) => void` | —                                                     | Fungsi callback saat tanggal dipilih                      |
| `selectedBackgroundColor` | `string` (CSS color)                   | `'#0f62fe'`                                           | Warna latar belakang tanggal yang dipilih                 |
| `selectedTextColor`       | `string` (CSS color)                   | `'#ffffff'`                                           | Warna teks pada tanggal yang dipilih                      |


---

## 📦 Instalasi

Komponen ini bersifat kustom dan belum tersedia sebagai package npm. Salin file `Calendar.tsx` ke dalam proyek React Native-mu.

### Kebutuhan:
- React Native
- TypeScript (opsional, tapi direkomendasikan)
- `dayjs` sebagai pengganti `moment.js` jika diperlukan

---

## 🧠 Contoh Penggunaan

```tsx
import React from 'react';
import Calendar from './Calendar';

export default function App() {
  const handleDateChange = (date: Date | [Date, Date]) => {
    console.log('Tanggal dipilih:', date);
  };

  return (
    <Calendar
      mode="range"
      markedDates={{
        '2025-06-10': { selected: true },
        '2025-06-11': { marked: true, dotColor: 'red' },
      }}
      disabledDates={['2025-06-15']}
      disabledDays={{ 0: true, 6: true }} // Nonaktifkan Minggu dan Sabtu
      minDate={new Date(2025, 5, 1)} // 1 Juni 2025
      maxDate={new Date(2025, 5, 30)} // 30 Juni 2025
      onChange={handleDateChange}
      selectedBackgroundColor="#0f62fe"
      selectedTextColor="#fff"
    />
  );
}

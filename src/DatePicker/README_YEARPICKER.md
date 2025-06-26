# YearPicker

**YearPicker** adalah komponen pemilih tahun berbasis **React Native**. Dibandingkan dengan *MonthPicker*, komponen ini mendukung navigasi halaman (pagination) untuk deretan tahun dan dapat digunakan dalam tiga mode:

* **single** – memilih satu tahun.
* **range** – memilih rentang tahun.
* **multiple** – memilih beberapa tahun sekaligus.

Semua outputnya dibungkus dalam komponen **BottomSheet** untuk konsistensi UI.

---

## API Reference

| Prop       | Tipe                                                                                  | Default    | Deskripsi                                                                            |
| ---------- | ------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `isOpen`   | `boolean`                                                                             | `false`    | Menentukan apakah **BottomSheet** terbuka.                                           |
| `onClose`  | `() => void`                                                                          | `-`        | Dipanggil saat pengguna menutup picker atau menekan **Batal**.                       |
| `onChange` | `(value: number[] \| { startDate: number \| null; endDate: number \| null }) => void` | `-`        | Dipanggil setelah pengguna menekan **Pilih**. Bentuk *value* bergantung pada `mode`. |
| `mode`     | `'single' \| 'range' \| 'multiple'`                                                   | `'single'` | Menentukan mode pemilihan.                                                           |

### Bentuk *value* `onChange`

| `mode`     | *value*                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| `single`   | `number[]` – satu elemen, contoh `[2023]`.                                                                             |
| `range`    | `{ startDate: number \| null; endDate: number \| null }` – objek rentang, contoh `{ startDate: 2010, endDate: 2015 }`. |
| `multiple` | `number[]` – daftar tahun, contoh `[2018, 2020, 2022]`.                                                                |

---

## Cara Kerja Singkat

1. **Daftar Tahun**

   * Komponen membuat rentang tahun ±60 tahun ke belakang & depan dari tahun saat ini (total 121 tahun).
2. **Pagination**

   * `pageSize` default 9 (3 kolom × 3 baris). Tombol panah mengubah `pageIndex` untuk melihat kelompok tahun selanjutnya atau sebelumnya.
3. **Seleksi & Highlight**

   * Tahun yang dipilih diberi latar `Color.primary[50]` dan border `Color.primary[300]`.
4. **Logika Mode**

   * *Single*: klik satu tahun.
   * *Range*: klik awal & akhir; otomatis menukar jika urutan terbalik.
   * *Multiple*: toggle checklist per tahun.

---

## Contoh Penggunaan

```tsx
import { useState } from 'react';
import { View, Button } from 'react-native';
import YearPicker from '@/components/YearPicker/YearPicker';

export default function YearPickerExample() {
  const [open, setOpen] = useState(false);
  const [yearRange, setYearRange] = useState<{ startDate: number | null; endDate: number | null }>({ startDate: null, endDate: null });

  const label = yearRange.startDate && yearRange.endDate ? `${yearRange.startDate}–${yearRange.endDate}` : '—';

  return (
    <View style={{ flex: 1 }}>
      <Button title={`Pilih Rentang Tahun (${label})`} onPress={() => setOpen(true)} />

      <YearPicker
        isOpen={open}
        mode="range"
        onClose={() => setOpen(false)}
        onChange={(value) => {
          if (!Array.isArray(value)) {
            setYearRange(value);
          }
          setOpen(false);
        }}
      />
    </View>
  );
}
```

---

## Kustomisasi Tampilan & Perilaku

| Konstanta / Style | Fungsi                                           | Cara Ubah                                |
| ----------------- | ------------------------------------------------ | ---------------------------------------- |
| `pageSize`        | Jumlah tahun ditampilkan per halaman (grid 3×N). | Sesuaikan untuk menambah baris.          |
| `buttonNav`       | Style tombol panah.                              | Edit warna & radius pada file `styles`.  |
| `optionSelected`  | Warna highlight.                                 | Ganti `backgroundColor` & `borderColor`. |

---

## Tips Implementasi

* Ingin memulai dengan tahun tertentu? Setel `singleValue`, `rangeValue`, atau `multipleValue` melalui `useState` sebelum `isOpen` di-set `true`.
* Anda dapat memfilter rentang tahun dengan memodifikasi konstanta `total` & `start` di dalam `useMemo(years)`.
* Pastikan memanggil `onClose` setelah `onChange` untuk menutup picker.

---

## Lisensi

Bagian dari library internal Anda; ikuti lisensi proyek.

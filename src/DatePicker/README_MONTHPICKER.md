# MonthPicker

Komponen **MonthPicker** adalah komponen pemilih bulan berbasis **React Native** yang dapat menampilkan pilihan bulan dalam tiga mode berbeda: **single**, **range**, dan **multiple**. Komponen ini dirancang untuk dipakai di dalam komponen **BottomSheet** dengan tampilan yang konsisten terhadap desain sistem.



---

## API Reference

| Prop       | Tipe                                                                                  | Default     | Deskripsi                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| `isOpen`   | `boolean`                                                                             | `false`     | Menentukan apakah **BottomSheet** terbuka atau tertutup.                                                         |
| `onClose`  | `() => void`                                                                          | `undefined` | Callback yang dipanggil saat pengguna menekan tombol **Batal** atau menutup **BottomSheet**.                     |
| `onChange` | `(value: number[] \| { startDate: number \| null; endDate: number \| null }) => void` | `undefined` | Callback yang dipanggil ketika pengguna menekan tombol **Pilih**. Parameter yang dikirim tergantung pada `mode`. |
| `mode`     | `'single' \| 'range' \| 'multiple'`                                                   | `'single'`  | Menentukan cara pemilihan bulan.                                                                                 |

### Bentuk *value* yang Dikirim oleh `onChange`

| `mode`     | Bentuk *value*                                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `single`   | `number[]` – array yang berisi satu elemen bulan terpilih. Contoh: `[5]` untuk Mei.                                                                |
| `range`    | `{ startDate: number \| null; endDate: number \| null }` – objek berisi bulan mulai & akhir. Contoh: `{ startDate: 1, endDate: 3 }` untuk Jan–Mar. |
| `multiple` | `number[]` – array berisi daftar bulan terpilih. Contoh: `[2, 4, 8]` untuk Feb, Apr, Agt.                                                          |

---

## Contoh Penggunaan

```tsx
import { useState } from 'react';
import { View, Button } from 'react-native';
import MonthPicker from '@/components/MonthPicker/MonthPicker';

export default function Example() {
  const [open, setOpen] = useState(false);
  const [months, setMonths] = useState<number[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Pilih Bulan" onPress={() => setOpen(true)} />

      <MonthPicker
        isOpen={open}
        mode="multiple"
        onClose={() => setOpen(false)}
        onChange={(value) => {
          if (Array.isArray(value)) {
            setMonths(value);
          }
          setOpen(false);
        }}
      />
    </View>
  );
}
```

---

## Detail 

1. **Single Mode**

   * Klik satu bulan untuk menandai pilihan.
   * Menekan **Pilih** mengirimkan array dengan satu elemen.
2. **Range Mode**

   * Klik bulan pertama untuk menentukan `startDate`.
   * Klik bulan kedua untuk menentukan `endDate`.
   * Jika `startDate` sudah terisi dan `endDate` belum, tetapi pengguna memilih bulan yang lebih kecil dari `startDate`, maka komponen otomatis menukar posisi dan mengisi `endDate` dengan nilai awal `startDate`.
3. **Multiple Mode**

   * Klik untuk toggle seleksi pada tiap bulan. Bulan yang dipilih disimpan dalam array `multipleValue`.

---

## Kustomisasi Tampilan

* **Warna**: Warna latar dan border untuk opsi terpilih mengikuti `Color.primary` pada design system. Anda dapat menyesuaikannya dengan mengubah style `optionSelected` di dalam `MonthPicker`.
* **Jumlah Kolom**: Saat ini komponen menampilkan `numColumns={3}` pada `FlatList`. Ubah nilai ini untuk menyesuaikan grid.

---

## Tips

* Pastikan memanggil `onClose` setelah memproses hasil `onChange` agar **BottomSheet** tertutup.
* Komponen ini tidak menangani validasi kombinasi bulan secara otomatis (mis. range satu tahun penuh). Tambahkan logika tambahan di tempat Anda memakainya apabila diperlukan.

---
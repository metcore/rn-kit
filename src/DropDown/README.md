# Dropdown

**Dropdown** merupakan komponen menu pilihan (select) berbasis **React Native** yang menampilkan daftar opsi di atas modal transparan. Komponen ini otomatis men‐posisikan daftar ke kiri atau ke kanan bergantung pada posisi tombol pemicu agar tidak terpotong layar.

---

## Instalasi

Komponen ini mengandalkan dependensi internal:

* `Color` – sistem warna.
* `ChipOptionProps` – tipe opsi.

Serta modul standar React Native: `Modal`, `ScrollView`, dll. Tidak memerlukan library eksternal.

---

## API Reference

| Prop           | Tipe                                | Default     | Deskripsi                                                           |
| -------------- | ----------------------------------- | ----------- | ------------------------------------------------------------------- |
| `options`      | `ChipOptionProps[]`                 | `[]`        | Daftar objek `{ label, value }` yang akan ditampilkan sebagai opsi. |
| `maxHeight`    | `number`                            | `200`       | Tinggi maksimum daftar sebelum dapat di‐scroll.                     |
| `onSelect`     | `(value: string \| number) => void` | `undefined` | Callback saat pengguna memilih opsi.                                |
| `renderButton` | `React.ReactNode`                   | **(wajib)** | Elemen yang dipakai sebagai tombol pemicu dropdown.                 |

### Struktur `ChipOptionProps`

```ts
interface ChipOptionProps {
  label: string;
  value: string | number;
}
```

---

## Cara Kerja Singkat

1. **Posisi & Alignment**

   * Saat tombol ditekan, komponen mengukur posisi tombol (`UIManager.measureInWindow`).
   * Jika titik tengah tombol berada di sisi kanan layar, daftar disejajarkan ke kanan; sebaliknya ke kiri.
2. **Modal & Pressable Overlay**

   * Daftar opsi dibungkus `Modal` transparan.
   * `Pressable` penuh layar di belakang daftar menangani klik di luar untuk menutup menu.
3. **Scroll & Batas Tinggi**

   * Daftar opsi di dalam `ScrollView` dengan properti `nestedScrollEnabled` agar tetap dapat di‐scroll di dalam modalsheet lain.
4. **Highlight Opsi Terpilih**

   * Opsi aktif diberi style `optionSelected` – background `Color.primary[50]` & border `Color.primary[300]`.

---

## Contoh Penggunaan

```tsx
import { useState } from 'react';
import { View, Text } from 'react-native';
import Dropdown from '@/components/Dropdown/Dropdown';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

export default function DropdownExample() {
  const [fruit, setFruit] = useState<string | number>('apple');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Dropdown
        options={options}
        maxHeight={150}
        onSelect={(val) => setFruit(val)}
        renderButton={
          <View style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}>
            <Text>{options.find((o) => o.value === fruit)?.label}</Text>
          </View>
        }
      />
    </View>
  );
}
```

---

## Kustomisasi Tampilan

| Style Key        | Fungsi                 | Cara Ubah                                         |
| ---------------- | ---------------------- | ------------------------------------------------- |
| `dropdownList`   | Container daftar opsi. | Ubah `width`, `borderRadius`, `borderColor`, dll. |
| `option`         | Setiap baris opsi.     | Ubah `padding` atau `gap` sesuai kebutuhan.       |
| `optionSelected` | Style opsi terpilih.   | Sesuaikan warna highlight dengan brand.           |

---

## Tips Implementasi

* **Kontrol Render Button**: Anda bebas menggunakan komponen apa pun sebagai `renderButton` (ikon, input field, card, dll.). Dropdown akan menggunakan posisi & ukuran elemen ini.
* **Close on Scroll Parent**: Jika dropdown dipakai dalam layar yang di‐scroll, pertimbangkan menutup dropdown saat parent di‐scroll untuk mencegah posisi meleset.
* **Validasi**: Komponen tidak memaksa nilai default. Anda dapat men‐set `selected` manual via `useState` agar kontrol tetap ter‐sinkron.

---

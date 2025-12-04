# TimePickerWheel

**TimePickerWheel** adalah komponen pemilih waktu berbentuk _wheel_ (picker bergulir) untuk **React Native**. Komponen ini menampilkan dua kolom (jam & menit) yang dapat digulir secara vertikal, dibungkus di dalam komponen **BottomSheet**.

---

## API Reference

| Prop       | Tipe                                                | Default                | Deskripsi                                                                                     |
| ---------- | --------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `isOpen`   | `boolean`                                           | `false`                | Menentukan apakah **BottomSheet** terbuka.                                                    |
| `onClose`  | `() => void`                                        | `-`                    | Callback saat pengguna menutup **BottomSheet** atau menekan tombol **Batal**.                 |
| `onChange` | `(value: { hour: number; minute: number }) => void` | `-`                    | Callback saat pengguna menekan tombol **Pilih**. Objek yang dikirim berisi `hour` & `minute`. |
| `value`    | `{ hour: number; minute: number }`                  | `{hour: 0, minute: 0}` | Props untuk mengontrol value dari parent                                                      |

### Bentuk _value_ `onChange`

```ts
{
  hour: number; // 0–23
  minute: number; // 0–59
}
```

---

## Cara Kerja Singkat

1. **Wheel Padding** – Komponen menambahkan elemen _dummy_ di atas & bawah daftar agar item tengah selalu berada di posisi highlight.
2. **Highlight** – Baris tengah diberi `backgroundColor` khusus (`Color.primary[50]`) untuk menonjolkan pilihan aktif.
3. **Snapping** – Properti `snapToInterval={ITEM_HEIGHT}` memastikan scroll _wheel_ berhenti tepat di setiap item.
4. **Sync & Loop** – Setelah scroll selesai, komponen menghitung indeks nyata (0‑23 untuk jam, 0‑59 untuk menit) agar wheel terasa tak terbatas.

---

## Contoh Penggunaan

```tsx
import { useState } from 'react';
import { View, Button } from 'react-native';
import TimePickerWheel from '@/components/TimePickerWheel/TimePickerWheel';

export default function Example() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<{ hour: number; minute: number } | null>(
    null
  );

  const formatted = time
    ? `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`
    : '—';

  return (
    <View style={{ flex: 1 }}>
      <Button
        title={`Pilih Waktu (${formatted})`}
        onPress={() => setOpen(true)}
      />

      <TimePickerWheel
        isOpen={open}
        onClose={() => setOpen(false)}
        onChange={(value) => {
          setTime(value);
          setOpen(false);
        }}
      />
    </View>
  );
}
```

---

## Kustomisasi Tampilan

- **Jumlah Items Terlihat** (`VISIBLE_ITEMS`): Default 5. Ubah nilai konstanta untuk menambah/kurangi tinggi wheel.
- **Tinggi Item** (`ITEM_HEIGHT`): Default 40. Pengaturan ini mempengaruhi `snapToInterval`.
- **Warna & Tipografi**: Edit style `selectedItemText`, `itemText`, dan `highlight` untuk menyesuaikan brand guideline.

---

## Tips Implementasi

- Selalu panggil `onClose` setelah menangani hasil `onChange` agar **BottomSheet** menutup.
- Jika Anda ingin menetapkan waktu awal sebelum picker dibuka, setel `selectedHour` & `selectedMinute` memakai `useState` lalu buka picker.
- Komponen ini tidak membatasi kombinasi jam‑menit (mis. langkah 5 menit). Tambahkan logika tambahan jika diperlukan.

---

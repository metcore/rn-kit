# 🌐 ToastProvider & useToast()

ToastProvider adalah context global untuk menampilkan notifikasi Toast dari bagian manapun dalam aplikasi Anda. Digunakan bersama dengan hook useToast() untuk memanggil toast secara imperatif.

## ⚙️ Setup

1. Bungkus aplikasi Anda dengan ToastProvider

```tsx
import React from 'react';
import { ToastProvider } from '@herca/rn-kit';

export default function App() {
  return <ToastProvider>{/* Seluruh aplikasi Anda */}</ToastProvider>;
}
```

2. Gunakan useToast() di dalam komponen

```tsx
import React from 'react';
import { Button } from '@herca/rn-kit';
import { useToast } from '@herca/rn-kit';

export default function Dashboard() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.show('Data berhasil disimpan', {
      color: 'success',
      icon: 'CheckCircle',
      duration: 4000,
    });
  };

  return <Button title="Simpan" onPress={handleSuccess} />;
}
```

## 🧩 API Reference

### ✅ ToastProvider

Menyediakan context global toast. Harus membungkus komponen root Anda.

| Prop       | Type        | Required | Description                       |
| ---------- | ----------- | -------- | --------------------------------- |
| `children` | `ReactNode` | ✅       | Semua komponen di dalam aplikasi. |

### useToast() Hook

| Function                  | Type                                                |
| ------------------------- | --------------------------------------------------- |
| `show(message, options?)` | `(message: string, options?: ToastOptions) => void` |

### ToastOptions

| Option        | Type               | Default             | Description                                       |
| ------------- | ------------------ | ------------------- | ------------------------------------------------- |
| `color`       | `ColorVariantType` | `'default'`         | Warna latar belakang dan teks.                    |
| `icon`        | `IconNameProps`    | `'ExclamationMark'` | Ikon di samping pesan.                            |
| `duration`    | `number` (ms)      | `3000`              | Waktu tampil Toast sebelum hilang.                |
| `action`      | `() => void`       | `undefined`         | Fungsi yang dijalankan ketika tombol aksi ditekan |
| `actionLabel` | `string`           | `Action`            | Label untuk tombol aksi (jika action diberikan).  |

### 🎨 ToastColor (Available Values)

| Value     | Keterangan        |
| --------- | ----------------- |
| `default` | Abu gelap         |
| `primary` | Biru utama        |
| `success` | Hijau sukses      |
| `danger`  | Merah galat       |
| `warning` | Kuning peringatan |
| `info`    | Biru informasi    |
| `orange`  | Oranye            |
| `purple`  | Ungu              |

---

## ❗ Error Handling

Error: useToast must be used within a ToastProvider

```tsx
Error: useToast must be used within a ToastProvider

```

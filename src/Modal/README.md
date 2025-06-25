# 🧊 ModalPopUp
ModalPopUp adalah komponen modal animasi dengan skala, dukungan backdrop, tombol close opsional, dan fleksibilitas ukuran serta gaya. Cocok untuk dialog, form, atau konfirmasi.

### 📦 Contoh Penggunaan
```tsx
import React, { useState } from 'react';
import { Text, Button } from 'react-native';
import ModalPopUp from '@herca/rn-kit/ModalPopUp';

export default function ExampleModal() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button title="Buka Modal" onPress={() => setVisible(true)} />
      <ModalPopUp isOpen={visible} onClose={() => setVisible(false)}>
        <Text style={{ fontSize: 18 }}>Ini adalah isi modal</Text>
      </ModalPopUp>
    </>
  );
}

```

## 🧩 API Reference

| Prop             | Type                         | Default     | Keterangan                                                            |
| ---------------- | ---------------------------- | ----------- | --------------------------------------------------------------------- |
| `isOpen`         | `boolean`                    | —           | Status untuk membuka/tutup modal.                                     |
| `onClose`        | `(isOpen?: boolean) => void` | `undefined` | Callback saat modal ditutup (baik via backdrop atau tombol close).    |
| `children`       | `ReactNode`                  | —           | Konten utama modal.                                                   |
| `backdrop`       | `boolean`                    | `true`      | Apakah backdrop gelap ditampilkan di belakang modal.                  |
| `closable`       | `boolean`                    | `true`      | Apakah tombol close (lingkaran kecil di kanan atas) ditampilkan.      |
| `onRequestClose` | `() => void`                 | `undefined` | Callback khusus saat backdrop ditekan (jika ingin override behavior). |
| `bgColor`        | `string`                     | `"#fff"`    | Warna latar belakang modal.                                           |
| `width`          | `DimensionValue`             | `"90%"`     | Lebar modal. Bisa `px`, `%`, atau nilai `number`.                     |
| `height`         | `DimensionValue`             | `undefined` | Tinggi modal (opsional, gunakan scroll jika tidak cukup).             |
| `containerStyle` | `ViewStyle`                  | `undefined` | Gaya tambahan untuk wrapper container (pusat layar).                  |
| `modalStyle`     | `ViewStyle`                  | `undefined` | Gaya tambahan untuk modal box.                                        |

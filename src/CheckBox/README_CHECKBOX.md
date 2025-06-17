# 📦 Komponen CheckBox

Komponen `CheckBox` digunakan untuk menampilkan input kotak centang (checkbox) interaktif dalam aplikasi React Native Anda.

---

## ✅ Fitur Utama

- Centang dan hilangkan centang (toggle)
- Dukungan label teks atau komponen kustom
- Dapat dinonaktifkan (`disabled`)
- Dukungan ikon (dengan komponen `Icon`)

---

## 🚀 Cara Penggunaan

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import CheckBox from './CheckBox';

export default function App() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View>
      <CheckBox
        checked={isChecked}
        onChange={setIsChecked}
        label="Saya menyetujui syarat dan ketentuan"
      />
    </View>
  );
}
```

##⚙️ Props

| Prop          | Tipe                         | Deskripsi                                                    |                                                                |
| ------------- | ---------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| `checked`     | `boolean`                    | Status awal checkbox (centang atau tidak). Default: `false`. |                                                                |
| `onChange`    | `(checked: boolean) => void` | Fungsi callback saat status checkbox berubah.                |                                                                |
| `label`       | \`string \\                  | React.ReactNode\`                                            | Label teks atau komponen yang ditampilkan di samping checkbox. |
| `disabled`    | `boolean`                    | Jika `true`, checkbox tidak bisa ditekan. Default: `false`.  |                                                                |
| `renderLabel` | `() => React.ReactNode`      | Alternatif render untuk label kustom selain `label`.         |                                                                |
